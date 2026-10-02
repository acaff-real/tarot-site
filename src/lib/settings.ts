import { getDatabase } from './db';
import fs from 'node:fs';
import path from 'node:path';

export interface InstagramPost1 {
  url: string;
  type: string;
  caption: string;
  image: string;
  duration: string;
  reelId?: string;
}

/** Extract Instagram Reel or Post ID and type from URL, embed code, or bare ID */
export function parseInstagramId(input?: string): { id: string; type: 'reel' | 'p' } | null {
  if (!input) return null;
  const trimmed = input.trim();
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const target = iframeSrcMatch ? iframeSrcMatch[1] : trimmed;
  const match = target.match(/(?:instagram\.com\/(?:reel|p)\/|instagr\.am\/p\/)([\w-]+)/i);
  if (match && match[1]) {
    const isReel = target.includes('/reel/');
    return { id: match[1], type: isReel ? 'reel' : 'p' };
  }
  if (/^[A-Za-z0-9_-]{9,20}$/.test(trimmed)) {
    return { id: trimmed, type: 'reel' };
  }
  return null;
}

export interface InstagramPost2 {
  url: string;
  type: string;
  title: string;
  subtitle: string;
  caption: string;
  image: string;
  reelId?: string;
}

export interface YouTubeFeature {
  url: string;
  videoId: string;
  title: string;
  description: string;
  channelUrl: string;
  channelTitle: string;
}

export interface SocialSettings {
  instagram1: InstagramPost1;
  instagram2: InstagramPost2;
  youtube: YouTubeFeature;
  youtube2?: YouTubeFeature;
}

export const DEFAULT_SOCIAL_SETTINGS: SocialSettings = {
  instagram1: {
    url: 'https://www.instagram.com/p/DW26WAOktMR/',
    type: 'Reel',
    caption: 'Tarot by Anisha — Intuitive reflections and cosmic timing.',
    image: '/images/studio.jpg',
    duration: '',
    reelId: 'DW26WAOktMR',
  },
  instagram2: {
    url: 'https://www.instagram.com/p/DWGBrbESA3L/',
    type: 'Reel',
    title: 'Tarot Wisdom',
    subtitle: 'Cosmic timing and contemplative insight.',
    caption: 'Daily intuitive tarot guidance by Anisha Banerji.',
    image: '',
    reelId: 'DWGBrbESA3L',
  },
  youtube: {
    url: 'https://www.youtube.com/watch?v=K5ePB4n7sNY',
    videoId: 'K5ePB4n7sNY',
    title: 'Virgo | 2026 Annual Astrology Horoscope Forecast',
    description: 'Annual planetary transits, major houses of growth, and contemplative forecast with Anisha Banerji.',
    channelUrl: 'https://www.youtube.com/tarotbyanisha',
    channelTitle: 'Tarot by Anisha',
  },
  youtube2: {
    url: 'https://www.youtube.com/watch?v=-YlwHI2DxiE',
    videoId: '-YlwHI2DxiE',
    title: 'Pisces | 2026 Annual Astrology Horoscope Forecast',
    description: 'Navigating deep transits, intuitive awakenings, and major personal timing with Anisha Banerji.',
    channelUrl: 'https://www.youtube.com/tarotbyanisha',
    channelTitle: 'Tarot by Anisha',
  },
};

const LOCAL_DATA_FILE = path.resolve(process.cwd(), 'src/data/social.json');

/** Extract an 11-character YouTube video ID from URL, iframe embed code, or bare ID */
export function extractYouTubeVideoId(input: string): string {
  if (!input) return DEFAULT_SOCIAL_SETTINGS.youtube.videoId;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const target = iframeSrcMatch ? iframeSrcMatch[1] : trimmed;
  const match = target.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/i);
  return match && match[1] ? match[1] : trimmed;
}

/** Retrieve current social settings from Cloudflare D1, falling back to local file or defaults */
export async function getSocialSettings(): Promise<SocialSettings> {
  const db = getDatabase();

  if (db) {
    try {
      // Ensure site_settings table exists
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS site_settings (
          key TEXT PRIMARY KEY,
          value TEXT,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('social_settings').first();
      if (row && typeof row.value === 'string') {
        const parsed = JSON.parse(row.value);
        const ig1 = parsed.instagram1 || {};
        const ig1Match = parseInstagramId(ig1.reelId || ig1.url || '');
        const ig2 = parsed.instagram2 || {};
        const ig2Match = parseInstagramId(ig2.reelId || ig2.url || '');
        return {
          instagram1: {
            ...DEFAULT_SOCIAL_SETTINGS.instagram1,
            ...ig1,
            reelId: ig1Match?.id || ig1.reelId || DEFAULT_SOCIAL_SETTINGS.instagram1.reelId,
          },
          instagram2: {
            ...DEFAULT_SOCIAL_SETTINGS.instagram2,
            ...ig2,
            reelId: ig2Match?.id || ig2.reelId || DEFAULT_SOCIAL_SETTINGS.instagram2.reelId,
          },
          youtube: {
            ...DEFAULT_SOCIAL_SETTINGS.youtube,
            ...(parsed.youtube || {}),
            videoId: extractYouTubeVideoId(parsed.youtube?.videoId || parsed.youtube?.url || DEFAULT_SOCIAL_SETTINGS.youtube.videoId),
          },
          youtube2: {
            ...(DEFAULT_SOCIAL_SETTINGS.youtube2 as YouTubeFeature),
            ...(parsed.youtube2 || {}),
            videoId: extractYouTubeVideoId(parsed.youtube2?.videoId || parsed.youtube2?.url || (DEFAULT_SOCIAL_SETTINGS.youtube2 as YouTubeFeature).videoId),
          },
        };
      }
    } catch (dbErr) {
      console.error('Error fetching social settings from D1:', dbErr);
    }
  }

  // Fallback to local data file if present (Node dev environment)
  try {
    if (fs.existsSync && fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      const ig1 = parsed.instagram1 || {};
      const ig1Match = parseInstagramId(ig1.reelId || ig1.url || '');
      const ig2 = parsed.instagram2 || {};
      const ig2Match = parseInstagramId(ig2.reelId || ig2.url || '');
      return {
        instagram1: {
          ...DEFAULT_SOCIAL_SETTINGS.instagram1,
          ...ig1,
          reelId: ig1Match?.id || ig1.reelId || DEFAULT_SOCIAL_SETTINGS.instagram1.reelId,
        },
        instagram2: {
          ...DEFAULT_SOCIAL_SETTINGS.instagram2,
          ...ig2,
          reelId: ig2Match?.id || ig2.reelId || DEFAULT_SOCIAL_SETTINGS.instagram2.reelId,
        },
        youtube: {
          ...DEFAULT_SOCIAL_SETTINGS.youtube,
          ...(parsed.youtube || {}),
          videoId: extractYouTubeVideoId(parsed.youtube?.videoId || parsed.youtube?.url || DEFAULT_SOCIAL_SETTINGS.youtube.videoId),
        },
        youtube2: {
          ...(DEFAULT_SOCIAL_SETTINGS.youtube2 as YouTubeFeature),
          ...(parsed.youtube2 || {}),
          videoId: extractYouTubeVideoId(parsed.youtube2?.videoId || parsed.youtube2?.url || (DEFAULT_SOCIAL_SETTINGS.youtube2 as YouTubeFeature).videoId),
        },
      };
    }
  } catch (fsErr) {
    // Ignore on edge
  }

  return { ...DEFAULT_SOCIAL_SETTINGS };
}

/** Persist social settings to D1 and local cache file */
export async function saveSocialSettings(newSettings: Partial<SocialSettings>): Promise<SocialSettings> {
  const current = await getSocialSettings();
  const ig1Input = newSettings.instagram1 || {};
  const ig1Match = parseInstagramId(ig1Input.reelId || ig1Input.url || current.instagram1.url || '');
  const ig2Input = newSettings.instagram2 || {};
  const ig2Match = parseInstagramId(ig2Input.reelId || ig2Input.url || current.instagram2.url || '');

  const merged: SocialSettings = {
    instagram1: {
      ...current.instagram1,
      ...ig1Input,
      reelId: ig1Match?.id || ig1Input.reelId || current.instagram1.reelId || '',
    },
    instagram2: {
      ...current.instagram2,
      ...ig2Input,
      reelId: ig2Match?.id || ig2Input.reelId || current.instagram2.reelId || '',
    },
    youtube: {
      ...current.youtube,
      ...(newSettings.youtube || {}),
      videoId: extractYouTubeVideoId(
        newSettings.youtube?.videoId ||
        newSettings.youtube?.url ||
        current.youtube.videoId
      ),
    },
    youtube2: {
      ...(current.youtube2 || (DEFAULT_SOCIAL_SETTINGS.youtube2 as YouTubeFeature)),
      ...(newSettings.youtube2 || {}),
      videoId: extractYouTubeVideoId(
        newSettings.youtube2?.videoId ||
        newSettings.youtube2?.url ||
        ((current.youtube2 && current.youtube2.videoId) || (DEFAULT_SOCIAL_SETTINGS.youtube2 as YouTubeFeature).videoId)
      ),
    },
  };

  const serialized = JSON.stringify(merged);
  const db = getDatabase();

  if (db) {
    try {
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS site_settings (
          key TEXT PRIMARY KEY,
          value TEXT,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      await db.prepare(`
        INSERT INTO site_settings (key, value, updated_at)
        VALUES ('social_settings', ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET
          value = excluded.value,
          updated_at = CURRENT_TIMESTAMP
      `).bind(serialized).run();
    } catch (dbErr) {
      console.error('Error saving social settings to D1:', dbErr);
      throw new Error(`D1 Database error: ${(dbErr as any)?.message}`);
    }
  }

  // Also persist to local file in dev
  try {
    if (fs.existsSync && fs.writeFileSync) {
      const dir = path.dirname(LOCAL_DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(merged, null, 2), 'utf-8');
    }
  } catch (fsErr) {
    // Ignored on edge runtime
  }

  return merged;
}
