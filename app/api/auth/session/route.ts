import { clearSession, getCurrentUser } from "@/lib/auth";
import { errorResponse, hasSameOrigin } from "@/lib/http";

export async function GET() {
  return Response.json({ user: await getCurrentUser() });
}

export async function DELETE(request: Request) {
  if (!hasSameOrigin(request)) return errorResponse("Request origin is not allowed.", 403);
  await clearSession();
  return Response.json({ ok: true });
}
