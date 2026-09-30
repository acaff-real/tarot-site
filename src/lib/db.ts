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
