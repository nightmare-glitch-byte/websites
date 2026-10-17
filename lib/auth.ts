import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { getDatabase } from "@/lib/database";

export const SESSION_COOKIE = "aura_session";
const SESSION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

export type AuthenticatedUser = {
  id: string;
  fullName: string;
  username: string;
  email: string | null;
  role: "admin" | "member";
  status: "approved" | "pending" | "rejected";
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const createdAt = Date.now();
  const database = await getDatabase();
  await database.query(
    "INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES ($1, $2, $3, $4)",
    [hashToken(token), userId, createdAt + SESSION_LIFETIME_MS, createdAt],
  );

  return { token, expiresAt: new Date(createdAt + SESSION_LIFETIME_MS) };
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const database = await getDatabase();
  const result = await database.query<{
    id: string;
    full_name: string;
    username: string;
    email: string | null;
    role: "admin" | "member";
    status: "approved" | "pending" | "rejected";
  }>(`
      SELECT users.id, users.full_name, users.username, users.email, users.role, users.status
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = $1 AND sessions.expires_at > $2
    `, [hashToken(token), Date.now()]);
  const row = result.rows[0];

  if (!row || row.status !== "approved") return null;
  return {
    id: row.id,
    fullName: row.full_name,
    username: row.username,
    email: row.email,
    role: row.role,
    status: row.status,
  };
}

export async function setSessionCookie(token: string, expiresAt: Date) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const database = await getDatabase();
    await database.query("DELETE FROM sessions WHERE token_hash = $1", [hashToken(token)]);
  }
  cookieStore.delete(SESSION_COOKIE);
}

export function createId() {
  return randomUUID();
}
