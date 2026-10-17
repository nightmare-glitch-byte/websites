import { getCurrentUser, type AuthenticatedUser } from "@/lib/auth";

export function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = forwardedHost || request.headers.get("host");
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const requestProtocol = forwardedProtocol || new URL(request.url).protocol.slice(0, -1);
    return Boolean(
      requestHost &&
        originUrl.host.toLowerCase() === requestHost.toLowerCase() &&
        originUrl.protocol.slice(0, -1).toLowerCase() === requestProtocol.toLowerCase(),
    );
  } catch {
    return false;
  }
}

export async function requireUser(role?: "admin" | "member"): Promise<AuthenticatedUser | null> {
  const user = await getCurrentUser();
  if (!user || (role && user.role !== role)) return null;
  return user;
}

export function validateCmsPayload(value: unknown) {
  if (!value || typeof value !== "object") return false;

  const content = value as Record<string, unknown>;
  const recordArrays = [
    content.galleryItems,
    content.events,
    content.departments,
    content.aurathonEditions,
    content.team,
  ];

  if (!Array.isArray(content.galleryCategories) || content.galleryCategories.length > 100) return false;
  if (!content.galleryCategories.every((item) => typeof item === "string" && item.length > 0 && item.length <= 100)) return false;
  if (!recordArrays.every((records) =>
    Array.isArray(records) &&
    records.length <= 200 &&
    records.every((record) =>
      Boolean(
        record &&
          typeof record === "object" &&
          typeof record.id === "string" &&
          record.id.length <= 100 &&
          Object.values(record).every((field) => typeof field === "string" && field.length <= 20_000),
      ),
    ),
  )) return false;

  return Boolean(
    content.about &&
      typeof content.about === "object" &&
      !Array.isArray(content.about) &&
      Object.values(content.about).every((field) => typeof field === "string" && field.length <= 20_000),
  );
}
