-- D1 Database Schema for Astro by Anisha
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

-- Default editorial user (SHA-256 hashed password)
INSERT OR IGNORE INTO users (username, password_hash, role) 
VALUES ('anisha', 'f81f684c3133388d356ba4c5ccca680aa351bd81bd211873950d0cad876ab55b', 'admin');
INSERT OR IGNORE INTO users (username, password_hash, role) 
VALUES ('admin', 'f81f684c3133388d356ba4c5ccca680aa351bd81bd211873950d0cad876ab55b', 'admin');
