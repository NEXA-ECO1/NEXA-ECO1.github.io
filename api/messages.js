import { ensureSchema, sql } from './db.js';

const ADMIN_PASSWORD = process.env.INBOX_PASSWORD || '1390';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function uid(prefix = 'm') {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function isAdmin(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7) === ADMIN_PASSWORD;
  }
  return false;
}

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await ensureSchema();

    // ---------- POST: ارسال پیام عمومی (بدون نیاز به رمز) ----------
    if (req.method === 'POST' && !req.query.action) {
      const { name, contact, body } = req.body || {};

      if (!body || typeof body !== 'string' || body.trim().length < 4) {
        return res.status(400).json({ error: 'متن پیام باید حداقل ۴ کاراکتر باشد' });
      }
      if (body.length > 2000) {
        return res.status(400).json({ error: 'پیام خیلی طولانی است' });
      }

      const id = uid('m');
      const cleanName = (name || 'مهمان').toString().trim().slice(0, 80) || 'مهمان';
      const cleanContact = (contact || '-').toString().trim().slice(0, 120) || '-';

      await sql`
        INSERT INTO messages (id, name, contact, body)
        VALUES (${id}, ${cleanName}, ${cleanContact}, ${body.trim()})
      `;

      return res.status(201).json({
        ok: true,
        id,
        message: 'پیام با موفقیت ذخیره شد'
      });
    }

    // ---------- از اینجا به بعد فقط ادمین ----------
    if (!isAdmin(req)) {
      return res.status(401).json({ error: 'دسترسی غیرمجاز' });
    }

    // GET: لیست پیام‌ها + ریپلای‌ها
    if (req.method === 'GET') {
      const { rows: messages } = await sql`
        SELECT id, name, contact, body, created_at, is_read
        FROM messages
        ORDER BY created_at DESC
        LIMIT 200
      `;

      const { rows: replies } = await sql`
        SELECT id, message_id, body, from_name, created_at
        FROM replies
        ORDER BY created_at ASC
      `;

      // attach replies to each message
      const map = {};
      messages.forEach(m => {
        map[m.id] = { ...m, replies: [] };
      });
      replies.forEach(r => {
        if (map[r.message_id]) map[r.message_id].replies.push(r);
      });

      return res.status(200).json({
        messages: Object.values(map)
      });
    }

    // POST action=reply
    if (req.method === 'POST' && req.query.action === 'reply') {
      const { messageId, body } = req.body || {};
      if (!messageId || !body || body.trim().length < 1) {
        return res.status(400).json({ error: 'messageId و body الزامی است' });
      }

      const id = uid('r');
      await sql`
        INSERT INTO replies (id, message_id, body, from_name)
        VALUES (${id}, ${messageId}, ${body.trim()}, ${'محمد یاسین کرمی'})
      `;

      // mark original as read
      await sql`
        UPDATE messages SET is_read = TRUE WHERE id = ${messageId}
      `;

      return res.status(201).json({ ok: true, id });
    }

    // POST action=read
    if (req.method === 'POST' && req.query.action === 'read') {
      const { messageId } = req.body || {};
      if (!messageId) return res.status(400).json({ error: 'messageId الزامی است' });

      await sql`
        UPDATE messages SET is_read = TRUE WHERE id = ${messageId}
      `;
      return res.status(200).json({ ok: true });
    }

    // POST action=delete
    if (req.method === 'POST' && req.query.action === 'delete') {
      const { messageId } = req.body || {};
      if (!messageId) return res.status(400).json({ error: 'messageId الزامی است' });

      await sql`DELETE FROM messages WHERE id = ${messageId}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({
      error: 'خطای سرور',
      detail: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}
