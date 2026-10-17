import Database from "better-sqlite3";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import { initializeDatabase } from "../lib/database-schema.mjs";

const dataDirectory = path.resolve(process.env.AURA_DATA_DIR || path.join(process.cwd(), ".aura-data"));
const sqlitePath = path.join(dataDirectory, "aura.sqlite");
const uploadsDirectory = path.join(dataDirectory, "uploads");
const required = ["DATABASE_URL", "S3_BUCKET", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY"];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) throw new Error(`Configure these variables before migration: ${missing.join(", ")}`);

const source = new Database(sqlitePath, { readonly: true, fileMustExist: true });
const target = new Pool({ connectionString: process.env.DATABASE_URL });
const objectStorage = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT || undefined,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

try {
  await initializeDatabase(target);
  const existingData = await target.query(`
    SELECT
      (SELECT COUNT(*) FROM users) +
      (SELECT COUNT(*) FROM sessions) +
      (SELECT COUNT(*) FROM media) +
      (SELECT COUNT(*) FROM site_content) AS record_count
  `);
  if (Number(existingData.rows[0].record_count) > 0) {
    throw new Error("The target PostgreSQL database is not empty. Migrate into a fresh database before starting the site or creating an administrator.");
  }

  const users = source.prepare("SELECT * FROM users").all();
  const sessions = source.prepare("SELECT * FROM sessions").all();
  const siteContent = source.prepare("SELECT * FROM site_content WHERE id = 1").get();
  const media = source.prepare("SELECT * FROM media").all();

  for (const item of media) {
    if (!/^[0-9a-f-]{36}\.(png|jpg|webp|gif)$/i.test(item.filename)) {
      throw new Error(`The local media filename "${item.filename}" is invalid; no migration was completed.`);
    }
    const image = await readFile(path.join(uploadsDirectory, item.filename));
    await objectStorage.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${item.filename}`,
      Body: image,
      ContentLength: image.length,
      ContentType: item.mime_type,
    }));
  }

  const connection = await target.connect();
  try {
    await connection.query("BEGIN");
    for (const user of users) {
      await connection.query(`
        INSERT INTO users (id, full_name, username, username_normalized, email, password_hash, role, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [user.id, user.full_name, user.username, user.username_normalized, user.email, user.password_hash, user.role, user.status, user.created_at]);
    }
    for (const session of sessions) {
      await connection.query(`
        INSERT INTO sessions (token_hash, user_id, expires_at, created_at)
        VALUES ($1, $2, $3, $4)
      `, [session.token_hash, session.user_id, session.expires_at, session.created_at]);
    }
    if (siteContent) {
      await connection.query(`
        INSERT INTO site_content (id, content_json, updated_at)
        VALUES (1, $1::jsonb, $2)
      `, [siteContent.content_json, siteContent.updated_at]);
    }
    for (const item of media) {
      await connection.query(`
        INSERT INTO media (id, filename, mime_type, size_bytes, created_at)
        VALUES ($1, $2, $3, $4, $5)
      `, [item.id, item.filename, item.mime_type, item.size_bytes, item.created_at]);
    }
    await connection.query("COMMIT");
  } catch (error) {
    await connection.query("ROLLBACK");
    throw error;
  } finally {
    connection.release();
  }

  console.log(`Migrated ${users.length} users, ${sessions.length} sessions, ${media.length} images, and ${siteContent ? "site content" : "no existing site content"}.`);
} finally {
  source.close();
  await target.end();
  objectStorage.destroy();
}
