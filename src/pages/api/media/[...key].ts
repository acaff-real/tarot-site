import type { APIRoute } from 'astro';
import { getBucket } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const key = params.key;
  if (!key) {
    return new Response('Not Found', { status: 404 });
  }

  // Path traversal protection
  if (key.includes('..') || key.startsWith('/') || key.startsWith('\\')) {
    return new Response('Forbidden', { status: 403 });
  }

  const bucket = getBucket();
  if (!bucket) {
    return new Response('Storage unavailable', { status: 503 });
  }

  try {
    const object = await bucket.get(key);
    if (!object) {
      return new Response('File Not Found', { status: 404 });
    }

    const headers = new Headers();
    if (typeof object.writeHttpMetadata === 'function') {
      object.writeHttpMetadata(headers);
    } else if (object.httpMetadata?.contentType) {
      headers.set('Content-Type', object.httpMetadata.contentType);
    }

    // Force safe content type — never serve HTML/SVG/XML inline
    const contentType = (headers.get('Content-Type') || '').toLowerCase();
    if (
      contentType.includes('html') ||
      contentType.includes('svg') ||
      contentType.includes('xml') ||
      contentType.includes('javascript')
    ) {
      headers.set('Content-Type', 'application/octet-stream');
      headers.set('Content-Disposition', 'attachment');
    }

    if (object.httpEtag) {
      headers.set('ETag', object.httpEtag);
    }
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    // Prevent MIME sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    return new Response(object.body, {
      headers,
    });
  } catch (err: any) {
    return new Response('Error retrieving file', { status: 500 });
  }
};
