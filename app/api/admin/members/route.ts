import { getDatabase } from "@/lib/database";
import { errorResponse, hasSameOrigin, requireUser } from "@/lib/http";

export async function GET() {
  const user = await requireUser("admin");
  if (!user) return errorResponse("Administrator login is required.", 401);

  const database = await getDatabase();
  const result = await database.query(`
      SELECT id, full_name AS fullName, username, email, created_at AS createdAt, status
      FROM users
      WHERE role = 'member'
      ORDER BY CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END, created_at DESC
    `);
  return Response.json({ members: result.rows }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!hasSameOrigin(request)) return errorResponse("Request origin is not allowed.", 403);
  const user = await requireUser("admin");
  if (!user) return errorResponse("Administrator login is required.", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("The approval request is invalid.", 400);
  }
  if (!body || typeof body !== "object") return errorResponse("The approval request is invalid.", 400);

  const { id, status } = body as Record<string, unknown>;
  if (typeof id !== "string" || !["approved", "rejected"].includes(String(status))) {
    return errorResponse("Choose a member and a valid approval decision.", 400);
  }

  const database = await getDatabase();
  const result = await database.query(
    "UPDATE users SET status = $1 WHERE id = $2 AND role = 'member' AND status = 'pending'",
    [status, id],
  );
  if (!result.rowCount) return errorResponse("This member is no longer awaiting approval.", 409);

  return Response.json({ ok: true });
}
