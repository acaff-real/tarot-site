import type { APIRoute } from 'astro';
import { getBucket } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  // Check auth session
  const authCookie = cookies.get('astro_admin_auth')?.value || cookies.get('journalist_auth')?.value;
  if (!authCookie || authCookie.length < 16) {
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

    // Sanitize file name
    const ext = file.name.split('.').pop() || 'jpg';
    const cleanBaseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase();
    const key = `uploads/${Date.now()}-${cleanBaseName}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();

    await bucket.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type || 'image/jpeg',
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
        contentType: file.type,
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
