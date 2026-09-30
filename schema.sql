-- D1 Database Schema for Astro by Anisha
-- Compatible with Cloudflare D1 and SQLite

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
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

-- Default editorial user (Change password in production)
INSERT OR IGNORE INTO users (username, password, role) 
VALUES ('anisha', 'AstroAnisha2026!', 'admin');
INSERT OR IGNORE INTO users (username, password, role) 
VALUES ('admin', 'AstroAnisha2026!', 'admin');
