import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { getDatabase, verifySignedToken, checkOrigin } from '../../lib/db';

export const prerender = false;

const ARTICLES_DIR = path.resolve(process.cwd(), 'src/content/articles');

// Simple robust frontmatter parser for Astro Markdown files
function parseArticleFile(fileName: string, raw: string) {
  const slug = fileName.replace(/\.md$/, '');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return {
      slug,
      title: slug,
      excerpt: '',
      category: 'Editorial Insights',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      readingTime: '5 min read',
      featuredImage: '/images/studio.jpg',
      tags: [],
      content: raw,
    };
  }

  const rawYaml = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  let currentKey = '';
  for (const line of rawYaml.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const listMatch = line.match(/^\s*-\s*["']?(.*?)["']?\s*$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(listMatch[1]);
      continue;
    }

    const keyValMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (keyValMatch) {
      currentKey = keyValMatch[1];
      let val = keyValMatch[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      } else if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1);
      }
      if (val === '') {
        data[currentKey] = [];
      } else {
        data[currentKey] = val;
      }
    }
  }

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    category: data.category || 'Vedic Astrology',
    date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    readingTime: data.readingTime || '5 min read',
    featuredImage: data.featuredImage || '/images/studio.jpg',
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  };
}

function serializeArticle(article: {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  featuredImage: string;
  tags: string[];
  content: string;
}) {
  const tagsYaml = (article.tags || []).map((t) => `  - "${t.replace(/"/g, '\\"')}"`).join('\n');
  const frontmatter = `---
title: "${(article.title || '').replace(/"/g, '\\"')}"
excerpt: "${(article.excerpt || '').replace(/"/g, '\\"')}"
category: "${article.category || 'Vedic Astrology'}"
date: "${article.date || ''}"
readingTime: "${article.readingTime || '5 min read'}"
featuredImage: "${article.featuredImage || '/images/studio.jpg'}"
tags:
${tagsYaml || '  - "Astrology"'}
---

${article.content.trim()}
`;
  return frontmatter;
}

async function checkAuth(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get('Cookie') || '';
  // Extract token value from cookie header
  let token = '';
  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim();
    if (trimmed.startsWith('astro_admin_auth=')) {
      token = trimmed.substring('astro_admin_auth='.length);
      break;
    }
    if (trimmed.startsWith('journalist_auth=')) {
      token = trimmed.substring('journalist_auth='.length);
      break;
    }
  }
  if (!token) return false;
  return verifySignedToken(token);
}

// GET /api/articles - List all articles or single article by ?slug=xxx
export const GET: APIRoute = async ({ url, locals }) => {
  try {
    const requestedSlug = url.searchParams.get('slug');
    const db = getDatabase();

    // 1. Single article lookup
    if (requestedSlug) {
      // Try D1 first
      if (db) {
        try {
          const row = await db.prepare('SELECT * FROM articles WHERE slug = ?').bind(requestedSlug).first();
          if (row) {
            let tagsArray = [];
            try {
              tagsArray = typeof row.tags === 'string' ? JSON.parse(row.tags) : (row.tags || []);
            } catch {
              tagsArray = typeof row.tags === 'string' ? row.tags.split(',').map((t: string) => t.trim()) : [];
            }
            return new Response(
              JSON.stringify({
                article: {
                  slug: row.slug,
                  title: row.title,
                  excerpt: row.excerpt,
                  category: row.category,
                  date: row.date,
                  readingTime: row.reading_time,
                  featuredImage: row.featured_image,
                  tags: tagsArray,
                  content: row.content,
                  publishedAt: row.published_at,
                },
              }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          }
        } catch (dbErr) {
          console.error('D1 single article lookup error:', dbErr);
        }
      }

      // Try local markdown file
      try {
        if (fs.existsSync(ARTICLES_DIR)) {
          const filePath = path.join(ARTICLES_DIR, `${requestedSlug}.md`);
          if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf-8');
            const article = parseArticleFile(`${requestedSlug}.md`, raw);
            return new Response(JSON.stringify({ article }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
      } catch (fsErr) {
        // Ignored on serverless edge
      }

      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. List all articles
    const articlesMap = new Map<string, any>();

    // Query D1 if available
    if (db) {
      try {
        const rows = await db.prepare('SELECT * FROM articles ORDER BY published_at DESC').all();
        if (rows && rows.results) {
          for (const row of rows.results as any[]) {
            let tagsArray = [];
            try {
              tagsArray = typeof row.tags === 'string' ? JSON.parse(row.tags) : (row.tags || []);
            } catch {
              tagsArray = typeof row.tags === 'string' ? row.tags.split(',').map((t: string) => t.trim()) : [];
            }
            articlesMap.set(row.slug, {
              slug: row.slug,
              title: row.title,
              excerpt: row.excerpt,
              category: row.category,
              date: row.date,
              readingTime: row.reading_time,
              featuredImage: row.featured_image,
              tags: tagsArray,
              content: row.content,
              publishedAt: row.published_at,
            });
          }
        }
      } catch (dbErr) {
        console.error('D1 list articles error:', dbErr);
      }
    }

    // Merge filesystem articles (if available in local Node dev)
    try {
      if (fs.existsSync(ARTICLES_DIR)) {
        const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
        for (const file of files) {
          const slug = file.replace(/\.md$/, '');
          if (!articlesMap.has(slug)) {
            const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
            articlesMap.set(slug, parseArticleFile(file, raw));
          }
        }
      }
    } catch (fsErr) {
      // Ignored on serverless edge
    }

    const articles = Array.from(articlesMap.values());

    return new Response(JSON.stringify({ articles }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST /api/articles - Create or update an article in D1 and local files
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    if (!checkOrigin(request)) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: invalid origin' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!await checkAuth(request)) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Please sign in at /publish to save or edit articles.' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await request.json();
    const { slug, title, excerpt, category, date, readingTime, featuredImage, tags, content } = body;

    if (!title) {
      return new Response(JSON.stringify({ error: 'Title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate safe clean slug if not given
    const cleanSlug = (
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    ).trim();

    const formattedDate =
      date ||
      new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      });

    // Auto-compute reading time if empty
    const wordCount = (content || '').trim().split(/\s+/).filter(Boolean).length;
    const computedReadingTime = readingTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
    const normalizedTags = Array.isArray(tags)
      ? tags
      : (tags || '')
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean);

    const db = getDatabase();

    // 1. Save / Update to Cloudflare D1
    if (db) {
      try {
        await db
          .prepare(
            `INSERT INTO articles (slug, title, excerpt, category, date, reading_time, featured_image, tags, content, published_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(slug) DO UPDATE SET
               title = excluded.title,
               excerpt = excluded.excerpt,
               category = excluded.category,
               date = excluded.date,
               reading_time = excluded.reading_time,
               featured_image = excluded.featured_image,
               tags = excluded.tags,
               content = excluded.content,
               published_at = CURRENT_TIMESTAMP`
          )
          .bind(
            cleanSlug,
            title,
            excerpt || '',
            category || 'Vedic Astrology',
            formattedDate,
            computedReadingTime,
            featuredImage || '/images/studio.jpg',
            JSON.stringify(normalizedTags),
            content || ''
          )
          .run();
      } catch (dbErr: any) {
        console.error('D1 article save error:', dbErr);
        return new Response(JSON.stringify({ error: `Database error: ${dbErr.message}` }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 2. In local dev environment, also save to Markdown file if filesystem is writable
    try {
      if (fs.existsSync && fs.writeFileSync) {
        if (!fs.existsSync(ARTICLES_DIR)) {
          fs.mkdirSync(ARTICLES_DIR, { recursive: true });
        }
        const fileContent = serializeArticle({
          title,
          excerpt: excerpt || '',
          category: category || 'Vedic Astrology',
          date: formattedDate,
          readingTime: computedReadingTime,
          featuredImage: featuredImage || '/images/studio.jpg',
          tags: normalizedTags,
          content: content || '',
        });
        const targetFile = path.join(ARTICLES_DIR, `${cleanSlug}.md`);
        fs.writeFileSync(targetFile, fileContent, 'utf-8');
      }
    } catch (fsErr) {
      // Normal and expected on Cloudflare edge runtime (read-only filesystem)
    }

    return new Response(
      JSON.stringify({
        success: true,
        slug: cleanSlug,
        message: `Article "${title}" published and saved successfully.`,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE /api/articles?slug=xxx
export const DELETE: APIRoute = async ({ request, url, locals }) => {
  try {
    if (!checkOrigin(request)) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: invalid origin' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!await checkAuth(request)) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Please sign in at /publish to delete articles.' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const slug = url.searchParams.get('slug');
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = getDatabase();

    // 1. Delete from D1
    if (db) {
      try {
        await db.prepare('DELETE FROM articles WHERE slug = ?').bind(slug).run();
      } catch (dbErr: any) {
        console.error('D1 delete error:', dbErr);
      }
    }

    // 2. Delete local markdown file if writable
    try {
      const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fsErr) {
      // Ignored on serverless edge
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Deleted "${slug}" successfully.`,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
