import type { APIRoute } from 'astro';
import { calculateVedicChart } from '../../lib/vedic/astronomy';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const name = (data.name || 'Seeker').trim();
    const dateStr = data.date; // "YYYY-MM-DD"
    const timeStr = data.time || '12:00'; // "HH:MM"
    const latitude = parseFloat(data.latitude ?? 28.6139);
    const longitude = parseFloat(data.longitude ?? 77.209);
    const timezone = parseFloat(data.timezone ?? 5.5);
    const cityName = data.cityName || 'New Delhi, India';

    if (!dateStr) {
      return new Response(JSON.stringify({ error: 'Birth date is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [yearStr, monthStr, dayStr] = dateStr.split('-');
    const [hourStr, minStr] = timeStr.split(':');

    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const hour = parseInt(hourStr || '12', 10);
    const minute = parseInt(minStr || '0', 10);

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute)) {
      return new Response(JSON.stringify({ error: 'Invalid date or time provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const chart = calculateVedicChart({
      name,
      year,
      month,
      day,
      hour,
      minute,
      latitude,
      longitude,
      timezoneOffset: timezone,
      cityName,
    });

    return new Response(JSON.stringify({ success: true, chart }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('Birth Chart Calculation API Error:', err);
    return new Response(
      JSON.stringify({
        error: 'Failed to compute Vedic birth chart. Please verify the input values.',
        details: err?.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
