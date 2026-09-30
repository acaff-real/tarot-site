import type { APIRoute } from 'astro';
import { getBucket, verifySignedToken, checkOrigin } from '../../lib/db';

export const prerender = false;

// Allowed MIME types for upload — only safe image/document types
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/bmp',
  'image/tiff',
  'application/pdf',
]);

// Blocked extensions that could execute code if served
const BLOCKED_EXTENSIONS = new Set([
  'html', 'htm', 'svg', 'xml', 'xhtml',
  'js', 'mjs', 'cjs', 'ts', 'jsx', 'tsx',
  'php', 'py', 'rb', 'sh', 'bat', 'cmd', 'ps1',
  'exe', 'dll', 'so', 'wasm',
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const POST: APIRoute = async ({ request, cookies }) => {
  // CSRF origin check
  if (!checkOrigin(request)) {
    return new Response(JSON.stringify({ success: false, error: 'Forbidden: invalid origin' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check auth session with HMAC verification
  const authCookie = cookies.get('astro_admin_auth')?.value || cookies.get('journalist_auth')?.value;
  if (!authCookie || !await verifySignedToken(authCookie)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const bucket = getBucket();
  if (!bucket) {
    return new Response(
      JSON.stringify({ success: false, error: 'R2 bucket storage is not configured or unavailable' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const customLabel = formData.get('label')?.toString().trim();

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ success: false, error: 'No valid file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Enforce file size limit
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ success: false, error: `File too large. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate MIME type
    const mimeType = (file.type || '').toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return new Response(
        JSON.stringify({ success: false, error: `File type "${mimeType || 'unknown'}" is not allowed. Only images and PDFs are accepted.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate file extension
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (BLOCKED_EXTENSIONS.has(ext)) {
      return new Response(
        JSON.stringify({ success: false, error: `File extension ".${ext}" is not allowed.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize file name
    const cleanBaseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase();
    const safeExt = ext.replace(/[^a-z0-9]/g, '') || 'jpg';
    const key = `uploads/${Date.now()}-${cleanBaseName}.${safeExt}`;

    const arrayBuffer = await file.arrayBuffer();

    await bucket.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: mimeType,
      },
    });

    const publicUrl = `/api/media/${key}`;
    const label = customLabel || file.name.replace(/\.[^/.]+$/, '');

    return new Response(
      JSON.stringify({
        success: true,
        key,
        url: publicUrl,
        label,
        size: file.size,
        contentType: mimeType,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
