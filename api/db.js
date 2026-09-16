import { neon } from '@neondatabase/serverless';

function getSql() {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED;

  if (!url) {
    throw new Error(
      'DATABASE_URL not found. Make sure Neon is connected and env vars are set, then Redeploy.'
    );
  }
  return neon(url);
}

/**
 * Initialize tables if they don't exist (idempotent).
 */
export async function ensureSchema() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL DEFAULT 'مهمان',
      contact     TEXT DEFAULT '-',
      body        TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      is_read     BOOLEAN NOT NULL DEFAULT FALSE
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS replies (
      id          TEXT PRIMARY KEY,
      message_id  TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
      body        TEXT NOT NULL,
      from_name   TEXT NOT NULL DEFAULT 'محمد یاسین کرمی',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_replies_message ON replies(message_id)`;
}

export function sql() {
  return getSql();
}
