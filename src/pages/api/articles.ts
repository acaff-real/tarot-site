import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

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

// GET /api/articles - List all articles or single article by ?slug=xxx
export const GET: APIRoute = async ({ url }) => {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) {
      fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    }

    const requestedSlug = url.searchParams.get('slug');

    if (requestedSlug) {
      const filePath = path.join(ARTICLES_DIR, `${requestedSlug}.md`);
      if (!fs.existsSync(filePath)) {
        return new Response(JSON.stringify({ error: 'Article not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const raw = fs.readFileSync(filePath, 'utf-8');
      const article = parseArticleFile(`${requestedSlug}.md`, raw);
      return new Response(JSON.stringify({ article }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
    const articles = files.map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
      return parseArticleFile(file, raw);
    });

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

function checkAuth(request: Request) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const authHeader = request.headers.get('Authorization') || '';
  const hasCookie = cookieHeader.includes('astro_admin_auth=') || cookieHeader.includes('journalist_auth=');
  const hasBearer = authHeader.startsWith('Bearer ');
  return hasCookie || hasBearer;
}

// POST /api/articles - Create or update an article markdown file
export const POST: APIRoute = async ({ request }) => {
  try {
    if (!checkAuth(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Please sign in at /publish to save or edit articles.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!fs.existsSync(ARTICLES_DIR)) {
      fs.mkdirSync(ARTICLES_DIR, { recursive: true });
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

    const fileContent = serializeArticle({
      title,
      excerpt: excerpt || '',
      category: category || 'Vedic Astrology',
      date: formattedDate,
      readingTime: computedReadingTime,
      featuredImage: featuredImage || '/images/studio.jpg',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      content: content || '',
    });

    const targetFile = path.join(ARTICLES_DIR, `${cleanSlug}.md`);
    fs.writeFileSync(targetFile, fileContent, 'utf-8');

    return new Response(
      JSON.stringify({
        success: true,
        slug: cleanSlug,
        message: `Saved ${cleanSlug}.md successfully`,
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
export const DELETE: APIRoute = async ({ request, url }) => {
  try {
    if (!checkAuth(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Please sign in at /publish to delete articles.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const slug = url.searchParams.get('slug');
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return new Response(JSON.stringify({ success: true, message: `Deleted ${slug}.md` }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
