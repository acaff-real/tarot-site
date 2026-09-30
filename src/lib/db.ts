import { env } from 'cloudflare:workers';

export function getEnv(): Record<string, any> {
  try {
    return (env as any) || {};
  } catch (e) {
    return {};
  }
}

export function getDatabase(): any {
  try {
    return (env as any)?.DB || null;
  } catch (e) {
    return null;
  }
}

export function getBucket(): any {
  try {
    return (env as any)?.BUCKET || null;
  } catch (e) {
    return null;
  }
}

// --- HMAC-based session token signing & verification ---
// Tokens are formatted as: <random-uuid>.<hex-hmac-signature>
// The HMAC key is derived from ADMIN_PASSWORD_HASH or SESSION_SECRET env var.

function getSessionSecret(): string {
  const cfEnv = getEnv();
  return (
    cfEnv.SESSION_SECRET ||
    cfEnv.ADMIN_PASSWORD_HASH ||
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD_HASH ||
    'astro-by-anisha-fallback-secret-change-me'
  );
}

async function hmacSign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Create a signed session token: <uuid>.<hmac> */
export async function createSignedToken(): Promise<string> {
  const nonce = crypto.randomUUID();
  const sig = await hmacSign(nonce, getSessionSecret());
  return `${nonce}.${sig}`;
}

/** Verify a signed session token returns true if genuine */
export async function verifySignedToken(token: string): Promise<boolean> {
  if (!token || !token.includes('.')) return false;
  const dotIndex = token.indexOf('.');
  const nonce = token.substring(0, dotIndex);
  const providedSig = token.substring(dotIndex + 1);
  if (!nonce || !providedSig) return false;
  const expectedSig = await hmacSign(nonce, getSessionSecret());
  // Constant-time comparison to prevent timing attacks
  if (expectedSig.length !== providedSig.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    mismatch |= expectedSig.charCodeAt(i) ^ providedSig.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Extract the raw token from cookies (checks both cookie names) */
export function getAuthToken(cookies: any): string | null {
  const token = cookies.get('astro_admin_auth')?.value || cookies.get('journalist_auth')?.value;
  return token || null;
}

/** Check origin header against allowed origins for CSRF protection */
export function checkOrigin(request: Request, allowedOrigins?: string[]): boolean {
  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');

  // For non-browser requests (no Origin header) on safe methods, allow
  if (!origin && !referer) return true;

  const allowed = allowedOrigins || [
    'https://astrobyanisha.com',
    'https://www.astrobyanisha.com',
    'https://tarot-site.asssasincraft8.workers.dev',
  ];

  if (origin && allowed.some((a) => origin.startsWith(a))) return true;
  if (referer && allowed.some((a) => referer.startsWith(a))) return true;

  return false;
}
