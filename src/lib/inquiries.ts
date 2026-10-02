import { getDatabase } from './db';
import fs from 'node:fs';
import path from 'node:path';

export interface Inquiry {
  id: number;
  type: string;
  name: string;
  email: string;
  phone?: string;
  service_or_topic?: string;
  preferred_schedule?: string;
  birth_details?: string;
  location_tz?: string;
  notes?: string;
  created_at: string;
}

const LOCAL_INQUIRIES_FILE = path.resolve(process.cwd(), 'src/data/inquiries.json');

function readLocalInquiries(): Inquiry[] {
  try {
    if (fs.existsSync && fs.existsSync(LOCAL_INQUIRIES_FILE)) {
      const raw = fs.readFileSync(LOCAL_INQUIRIES_FILE, 'utf-8');
      const list = JSON.parse(raw);
      if (Array.isArray(list)) return list;
    }
  } catch (err) {
    // Ignore error on edge
  }
  return [];
}

function writeLocalInquiries(inquiries: Inquiry[]) {
  try {
    if (fs.existsSync && fs.writeFileSync) {
      const dir = path.dirname(LOCAL_INQUIRIES_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
    }
  } catch (err) {
    // Ignore on edge
  }
}

/** Retrieve all inquiries ordered by latest first */
export async function getInquiries(): Promise<Inquiry[]> {
  const db = getDatabase();

  if (db) {
    try {
      await db.prepare(`
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
        )
      `).run();

      const result = await db.prepare('SELECT * FROM inquiries ORDER BY id DESC').all();
      if (result && Array.isArray(result.results) && result.results.length > 0) {
        return result.results as Inquiry[];
      }
    } catch (dbErr) {
      console.error('Error fetching inquiries from D1:', dbErr);
    }
  }

  // Fallback to local file in dev
  return readLocalInquiries();
}

/** Record a new consultation or contact inquiry */
export async function createInquiry(data: Partial<Inquiry>): Promise<Inquiry> {
  const db = getDatabase();
  const type = (data.type || 'consultation').trim();
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const phone = (data.phone || '').trim();
  const serviceOrTopic = (data.service_or_topic || '').trim();
  const preferredSchedule = (data.preferred_schedule || '').trim();
  const birthDetails = (data.birth_details || '').trim();
  const locationTz = (data.location_tz || '').trim();
  const notes = (data.notes || '').trim();
  const now = new Date().toISOString();

  let insertedId = Date.now();

  if (db) {
    try {
      await db.prepare(`
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
        )
      `).run();

      const res = await db.prepare(`
        INSERT INTO inquiries (type, name, email, phone, service_or_topic, preferred_schedule, birth_details, location_tz, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        type,
        name,
        email,
        phone,
        serviceOrTopic,
        preferredSchedule,
        birthDetails,
        locationTz,
        notes
      ).run();

      if (res && res.meta && typeof res.meta.last_row_id === 'number') {
        insertedId = res.meta.last_row_id;
      }
    } catch (dbErr) {
      console.error('Error saving inquiry to D1:', dbErr);
      throw new Error(`D1 Database error: ${(dbErr as any)?.message}`);
    }
  }

  const newRecord: Inquiry = {
    id: insertedId,
    type,
    name,
    email,
    phone,
    service_or_topic: serviceOrTopic,
    preferred_schedule: preferredSchedule,
    birth_details: birthDetails,
    location_tz: locationTz,
    notes,
    created_at: now,
  };

  // Sync with local file
  const localList = readLocalInquiries();
  localList.unshift(newRecord);
  writeLocalInquiries(localList);

  return newRecord;
}

/** Delete an inquiry by ID */
export async function deleteInquiry(id: number): Promise<boolean> {
  const db = getDatabase();

  if (db) {
    try {
      await db.prepare('DELETE FROM inquiries WHERE id = ?').bind(id).run();
    } catch (dbErr) {
      console.error('Error deleting inquiry from D1:', dbErr);
    }
  }

  // Update local file
  const localList = readLocalInquiries().filter((item) => item.id !== id);
  writeLocalInquiries(localList);

  return true;
}
