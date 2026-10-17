import { Pool } from "pg";
import { defaultCmsContent, isCmsContent } from "@/lib/cms-content";
import type { CmsContent } from "@/lib/cms-content";
import { initializeDatabase } from "@/lib/database-schema.mjs";

declare global {
  var auraDatabase: Pool | undefined;
  var auraDatabaseReady: Promise<Pool> | undefined;
}

export async function getDatabase(): Promise<Pool> {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required. Configure PostgreSQL before starting the website.");
  }

  if (!globalThis.auraDatabaseReady) {
    const pool = globalThis.auraDatabase ?? new Pool({ connectionString: process.env.DATABASE_URL });
    globalThis.auraDatabase = pool;
    const ready = (async () => {
      await initializeDatabase(pool);
      await pool.query(
        "INSERT INTO site_content (id, content_json, updated_at) VALUES (1, $1::jsonb, $2) ON CONFLICT (id) DO NOTHING",
        [JSON.stringify(defaultCmsContent), Date.now()],
      );
      return pool;
    })();
    globalThis.auraDatabaseReady = ready;
    void ready.catch(() => {
      if (globalThis.auraDatabaseReady === ready) globalThis.auraDatabaseReady = undefined;
    });
  }

  return globalThis.auraDatabaseReady;
}

export async function readCmsContent(): Promise<CmsContent> {
  const database = await getDatabase();
  const result = await database.query<{ content_json: unknown }>(
    "SELECT content_json FROM site_content WHERE id = 1",
  );
  const content = result.rows[0]?.content_json;
  if (!isCmsContent(content)) throw new Error("The PostgreSQL content database is missing valid initial content.");
  return content;
}

export async function writeCmsContent(content: CmsContent): Promise<void> {
  const database = await getDatabase();
  const result = await database.query(
    "UPDATE site_content SET content_json = $1::jsonb, updated_at = $2 WHERE id = 1",
    [JSON.stringify(content), Date.now()],
  );
  if (!result.rowCount) throw new Error("The PostgreSQL content record is missing.");
}
