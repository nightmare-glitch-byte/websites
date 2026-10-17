import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getDatabase } from "@/lib/database";
import { errorResponse, hasSameOrigin, requireUser } from "@/lib/http";
import { getObjectStorage } from "@/lib/object-storage";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function detectImage(buffer: Buffer) {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { extension: "png", mimeType: "image/png" };
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { extension: "jpg", mimeType: "image/jpeg" };
  }
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return { extension: "webp", mimeType: "image/webp" };
  }
  if (buffer.length >= 6 && ["GIF87a", "GIF89a"].includes(buffer.toString("ascii", 0, 6))) {
    return { extension: "gif", mimeType: "image/gif" };
  }
  return null;
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return errorResponse("Request origin is not allowed.", 403);
  const user = await requireUser("admin");
  if (!user) return errorResponse("Administrator login is required to upload images.", 401);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_IMAGE_SIZE + 64 * 1024) {
    return errorResponse("Choose an image no larger than 10 MB.", 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse("Choose an image file to upload.", 400);
  }

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) return errorResponse("Choose an image file to upload.", 400);
  if (image.size > MAX_IMAGE_SIZE) return errorResponse("Choose an image no larger than 10 MB.", 413);

  const buffer = Buffer.from(await image.arrayBuffer());
  const format = detectImage(buffer);
  if (!format) return errorResponse("Use a valid PNG, JPEG, WebP, or GIF image.", 415);

  const id = randomUUID();
  const filename = `${id}.${format.extension}`;
  const key = `uploads/${filename}`;
  const { client, bucket } = getObjectStorage();
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentLength: buffer.length,
    ContentType: format.mimeType,
  }));
  try {
    const database = await getDatabase();
    await database.query(
      "INSERT INTO media (id, filename, mime_type, size_bytes, created_at) VALUES ($1, $2, $3, $4, $5)",
      [id, filename, format.mimeType, buffer.length, Date.now()],
    );
  } catch (error) {
    try {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    } catch (cleanupError) {
      throw new AggregateError([error, cleanupError], "Unable to save media metadata or clean up its uploaded object.");
    }
    throw error;
  }

  return Response.json({ id, url: `/api/media/${id}`, mimeType: format.mimeType });
}
