import type { APIRoute } from 'astro';
import { getBucket } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const key = params.key;
  if (!key) {
    return new Response('Not Found', { status: 404 });
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
    
    if (object.httpEtag) {
      headers.set('ETag', object.httpEtag);
    }
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(object.body, {
      headers,
    });
  } catch (err: any) {
    return new Response(`Error retrieving file: ${err.message}`, { status: 500 });
  }
};
