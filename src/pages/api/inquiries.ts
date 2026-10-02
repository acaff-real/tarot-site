import type { APIRoute } from 'astro';
import { checkOrigin, verifySignedToken } from '../../lib/db';
import { getInquiries, createInquiry, deleteInquiry } from '../../lib/inquiries';

export const prerender = false;

async function checkAuth(cookies: any): Promise<boolean> {
  const token = cookies.get('astro_admin_auth')?.value || cookies.get('journalist_auth')?.value;
  if (!token) return false;
  return verifySignedToken(token);
}

// GET /api/inquiries - List all inquiries (Requires Authentication)
export const GET: APIRoute = async ({ request, cookies }) => {
  if (!checkOrigin(request)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Forbidden: invalid origin' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const isAuth = await checkAuth(cookies);
  if (!isAuth) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const inquiries = await getInquiries();
    return new Response(
      JSON.stringify({ success: true, inquiries }),
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
      JSON.stringify({ success: false, error: err?.message || 'Failed to fetch inquiries' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST /api/inquiries - Submit an inquiry (Public, CSRF Protected)
export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = await request.json();
    const type = (data.type || 'consultation').trim();
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const serviceOrTopic = (data.serviceOrTopic || data.service || data.topic || data.service_or_topic || '').trim();
    const preferredSchedule = (data.preferredSchedule || data.schedule || data.preferred_schedule || '').trim();
    const birthDetails = (data.birthDetails || data.birth_details || '').trim();
    const locationTz = (data.locationTz || data.tz || data.location_tz || '').trim();
    const notes = (data.notes || data.message || '').trim();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name and email are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const saved = await createInquiry({
      type,
      name,
      email,
      phone,
      service_or_topic: serviceOrTopic,
      preferred_schedule: preferredSchedule,
      birth_details: birthDetails,
      location_tz: locationTz,
      notes,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Inquiry recorded successfully', inquiry: saved }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (err: any) {
    console.error('Inquiry Submission Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to record inquiry', details: err?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// DELETE /api/inquiries?id=xxx - Delete an inquiry (Requires Authentication)
export const DELETE: APIRoute = async ({ request, url, cookies }) => {
  if (!checkOrigin(request)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const isAuth = await checkAuth(cookies);
  if (!isAuth) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const idParam = url.searchParams.get('id');
  if (!idParam) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing inquiry ID' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid inquiry ID' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await deleteInquiry(id);
    return new Response(
      JSON.stringify({ success: true, message: `Inquiry #${id} deleted successfully.` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to delete inquiry' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
