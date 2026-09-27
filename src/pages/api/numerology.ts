import type { APIRoute } from 'astro';
import { calculateNameNumerology, type NumerologySystem } from '../../lib/numerology/calculator';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const name = (data.name || '').trim();
    const system: NumerologySystem = data.system === 'pythagorean' ? 'pythagorean' : 'chaldean';

    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = calculateNameNumerology(name, system);

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('Numerology API Error:', err);
    return new Response(
      JSON.stringify({
        error: 'Failed to calculate numerology.',
        details: err?.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
