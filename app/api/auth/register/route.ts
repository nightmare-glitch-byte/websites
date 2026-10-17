import { randomUUID } from "node:crypto";
import { getDatabase } from "@/lib/database";
import { errorResponse, hasSameOrigin } from "@/lib/http";
import { hashPassword } from "@/lib/passwords.mjs";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return errorResponse("Request origin is not allowed.", 403);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Enter your name, username, email, and password.", 400);
  }
  if (!body || typeof body !== "object") return errorResponse("Enter your name, username, email, and password.", 400);

  const { fullName, username, email, password } = body as Record<string, unknown>;
  if (
    typeof fullName !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return errorResponse("Enter your name, username, email, and password.", 400);
  }

  const normalizedName = fullName.trim();
  const normalizedUsername = username.trim();
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedName.length < 2 || normalizedName.length > 100) {
    return errorResponse("Your name must be between 2 and 100 characters.", 400);
  }
  if (!/^[a-zA-Z0-9_.-]{3,30}$/.test(normalizedUsername)) {
    return errorResponse("Username must be 3–30 letters, numbers, dots, underscores, or hyphens.", 400);
  }
  if (normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return errorResponse("Enter a valid email address.", 400);
  }
  if (password.length < 12 || password.length > 128) {
    return errorResponse("Password must be between 12 and 128 characters.", 400);
  }

  const database = await getDatabase();
  const passwordHash = await hashPassword(password);
  try {
    await database.query(`
        INSERT INTO users (id, full_name, username, username_normalized, email, password_hash, role, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, 'member', 'pending', $7)
      `, [
        randomUUID(),
        normalizedName,
        normalizedUsername,
        normalizedUsername.toLowerCase(),
        normalizedEmail,
        passwordHash,
        Date.now(),
      ]);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return errorResponse("That username or email is already registered.", 409);
    }
    throw error;
  }

  return Response.json({ message: "Registration submitted. An administrator must approve your account before you can log in." }, { status: 201 });
}
