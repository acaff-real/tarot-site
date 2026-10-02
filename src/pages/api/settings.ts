import type { APIRoute } from 'astro';
import { checkOrigin, verifySignedToken } from '../../lib/db';
import { getSocialSettings, saveSocialSettings } from '../../lib/settings';

export const prerender = false;

async function checkAuth(request: Request, cookies: any): Promise<boolean> {
  const token = cookies.get('astro_admin_auth')?.value || cookies.get('journalist_auth')?.value;
  if (!token) return false;
  return verifySignedToken(token);
}

// GET /api/settings - Retrieve public settings (socials, etc.)
export const GET: APIRoute = async () => {
  try {
    const settings = await getSocialSettings();
    return new Response(
      JSON.stringify({ success: true, settings }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to fetch settings' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// POST /api/settings - Update site settings (Requires Authentication)
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkOrigin(request)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Forbidden: invalid origin' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const isAuth = await checkAuth(request, cookies);
  if (!isAuth) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized. Please sign in to update settings.' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = await request.json();
    const updated = await saveSocialSettings(body);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Featured social links and embeds updated successfully.',
        settings: updated,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err: any) {
    console.error('Settings API update error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to save settings' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
