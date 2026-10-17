import { getDatabase, readCmsContent, writeCmsContent } from "@/lib/database";
import { errorResponse, hasSameOrigin, requireUser, validateCmsPayload } from "@/lib/http";
import { isCmsContent } from "@/lib/cms-content";

export async function GET() {
  return Response.json(
    { content: await readCmsContent() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PUT(request: Request) {
  if (!hasSameOrigin(request)) return errorResponse("Request origin is not allowed.", 403);
  const user = await requireUser("admin");
  if (!user) return errorResponse("Administrator login is required to update site content.", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("The content update is not valid JSON.", 400);
  }
  const content = body && typeof body === "object" ? (body as Record<string, unknown>).content : null;
  if (!isCmsContent(content) || !validateCmsPayload(content)) {
    return errorResponse("The content update is invalid or exceeds the allowed size.", 400);
  }

  const validCategories = new Set(content.galleryCategories);
  if (content.galleryItems.some((item) => !validCategories.has(item.category))) {
    return errorResponse("Move gallery items to an active category before removing their category.", 400);
  }

  const validImagePath = (image: string) => !image || image.startsWith("/api/media/");
  if (
    [...content.galleryItems, ...content.aurathonEditions, ...content.team].some(
      (item) => !validImagePath(item.image),
    )
  ) {
    return errorResponse("Upload images using the admin editor before saving them.", 400);
  }

  const referencedMedia = [
    ...content.galleryItems,
    ...content.aurathonEditions,
    ...content.team,
  ].map((item) => item.image).filter(Boolean);
  const mediaIds = referencedMedia.map((image) => image.slice("/api/media/".length));
  if (mediaIds.length) {
    const database = await getDatabase();
    const existingMedia = await database.query<{ count: string }>(
      "SELECT COUNT(*) AS count FROM media WHERE id = ANY($1::text[])",
      [mediaIds],
    );
    if (Number(existingMedia.rows[0]?.count) !== new Set(mediaIds).size) {
      return errorResponse("One or more selected images are not present in local media storage.", 400);
    }
  }

  await writeCmsContent(content);
  return Response.json({ content });
}
