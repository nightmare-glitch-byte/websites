import { createSession, setSessionCookie } from "@/lib/auth";
import { getDatabase } from "@/lib/database";
import { errorResponse, hasSameOrigin } from "@/lib/http";
import { verifyPassword } from "@/lib/passwords.mjs";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return errorResponse("Request origin is not allowed.", 403);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Enter your username or email and password.", 400);
  }
  if (!body || typeof body !== "object") return errorResponse("Enter your username or email and password.", 400);

  const { identity, password } = body as Record<string, unknown>;
  if (typeof identity !== "string" || typeof password !== "string" || !identity.trim() || !password) {
    return errorResponse("Enter your username or email and password.", 400);
  }

  const normalizedIdentity = identity.trim().toLowerCase();
  const database = await getDatabase();
  const result = await database.query<{
    id: string;
    password_hash: string;
    role: "admin" | "member";
    status: "approved" | "pending" | "rejected";
    username: string;
    full_name: string;
  }>(`
      SELECT id, password_hash, role, status, username, full_name
      FROM users
      WHERE username_normalized = $1 OR email = $2
      LIMIT 1
    `, [normalizedIdentity, normalizedIdentity]);
  const row = result.rows[0];

  if (!row || !(await verifyPassword(password, row.password_hash))) {
    return errorResponse("The username or password is incorrect.", 401);
  }
  if (row.status === "pending") return errorResponse("Your registration is awaiting admin approval.", 403);
  if (row.status !== "approved") return errorResponse("This registration was not approved. Contact an administrator.", 403);

  const session = await createSession(row.id);
  await setSessionCookie(session.token, session.expiresAt);
  return Response.json({ user: { username: row.username, fullName: row.full_name, role: row.role } });
}
