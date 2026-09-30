import type { APIRoute } from 'astro';
import { getDatabase } from '../../lib/db';

export const prerender = false;

async function hashSha256(val: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(val));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function checkAuth(cookies: any): boolean {
  const token = cookies.get('astro_admin_auth')?.value || cookies.get('journalist_auth')?.value;
  return Boolean(token && token.length >= 16);
}

// GET: List all authorized publishing users
export const GET: APIRoute = async ({ cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const db = getDatabase();
  if (!db) {
    return new Response(JSON.stringify({ success: false, error: 'D1 database not connected' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = await db.prepare('SELECT id, username, role FROM users ORDER BY id ASC').all();
    return new Response(JSON.stringify({ success: true, users: result.results || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST: Create new user or update existing user's password / role
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const db = getDatabase();
  if (!db) {
    return new Response(JSON.stringify({ success: false, error: 'D1 database not connected' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const rawUsername = body.username?.toString().trim().toLowerCase();
    const password = body.password?.toString();
    const role = (body.role?.toString().trim().toLowerCase()) || 'author';

    if (!rawUsername || rawUsername.length < 3) {
      return new Response(
        JSON.stringify({ success: false, error: 'Username must be at least 3 characters long.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!/^[a-z0-9_.-]+$/.test(rawUsername)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Username can only contain letters, numbers, hyphens, periods, or underscores.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!password || password.length < 6) {
      return new Response(
        JSON.stringify({ success: false, error: 'Password must be at least 6 characters long.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validRoles = ['admin', 'editor', 'author'];
    const assignedRole = validRoles.includes(role) ? role : 'author';
    const passwordHash = await hashSha256(password);

    await db
      .prepare(`
        INSERT INTO users (username, password_hash, role)
        VALUES (?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
          password_hash = excluded.password_hash,
          role = excluded.role
      `)
      .bind(rawUsername, passwordHash, assignedRole)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `User "${rawUsername}" saved successfully with role "${assignedRole}".`,
        user: { username: rawUsername, role: assignedRole },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Error creating user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE: Remove an authorized user
export const DELETE: APIRoute = async ({ url, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const db = getDatabase();
  if (!db) {
    return new Response(JSON.stringify({ success: false, error: 'D1 database not connected' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const username = url.searchParams.get('username')?.trim().toLowerCase();
  if (!username) {
    return new Response(JSON.stringify({ success: false, error: 'Username parameter is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (username === 'admin' || username === 'anisha') {
    return new Response(
      JSON.stringify({ success: false, error: 'Cannot delete primary root accounts (admin / anisha).' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await db.prepare('DELETE FROM users WHERE LOWER(username) = LOWER(?)').bind(username).run();
    return new Response(
      JSON.stringify({ success: true, message: `User "${username}" has been removed.` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
