-- D1 Database Schema for Astrology with Anisha
-- Compatible with Cloudflare D1 and SQLite

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    role TEXT DEFAULT 'author',
    session_token TEXT
);

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    excerpt TEXT,
    category TEXT,
    date TEXT,
    reading_time TEXT,
    featured_image TEXT,
    tags TEXT,
    content TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drafts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    slug TEXT,
    data TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    service_or_topic TEXT,
    preferred_schedule TEXT,
    birth_details TEXT,
    location_tz TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default editorial user (SHA-256 hashed password)
INSERT OR IGNORE INTO users (username, password_hash, role) 
VALUES ('anisha', 'f81f684c3133388d356ba4c5ccca680aa351bd81bd211873950d0cad876ab55b', 'admin');
INSERT OR IGNORE INTO users (username, password_hash, role) 
VALUES ('admin', 'f81f684c3133388d356ba4c5ccca680aa351bd81bd211873950d0cad876ab55b', 'admin');

CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO site_settings (key, value)
VALUES ('social_settings', '{"instagram1":{"url":"https://www.instagram.com/tarotbyanisha/","type":"Reel","caption":"\"Saturn tests where your foundations were built on obligation rather than authenticity. Slow down and rebuild with truth.\"","image":"/images/studio.jpg","duration":"0:58"},"instagram2":{"url":"https://www.instagram.com/tarotbyanisha/","type":"Tarot Archetypes","title":"IX • The Hermit","subtitle":"\"Silence is not empty; it is the ground of revelation.\"","caption":"\"The Hermit invites you to step outside the noise of external counsel and listen to the voice that only speaks in stillness.\"","image":""},"youtube":{"url":"https://www.youtube.com/watch?v=K5ePB4n7sNY","videoId":"K5ePB4n7sNY","title":"Virgo | 2026 Annual Astrology Horoscope Forecast","description":"Annual planetary transits, major houses of growth, and contemplative forecast with Anisha Banerji.","channelUrl":"https://www.youtube.com/tarotbyanisha","channelTitle":"Tarot by Anisha"}}');

