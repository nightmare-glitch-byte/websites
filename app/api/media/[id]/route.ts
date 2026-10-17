import { GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { getDatabase } from "@/lib/database";
import { getObjectStorage } from "@/lib/object-storage";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response("Not found", { status: 404 });

  const database = await getDatabase();
  const result = await database.query<{ filename: string; mime_type: string }>(
    "SELECT filename, mime_type FROM media WHERE id = $1",
    [id],
  );
  const media = result.rows[0];
  if (!media || !/^[0-9a-f-]{36}\.(png|jpg|webp|gif)$/i.test(media.filename)) {
    return new Response("Not found", { status: 404 });
  }

  const { client, bucket } = getObjectStorage();
  let object;
  try {
    object = await client.send(new GetObjectCommand({
      Bucket: bucket,
      Key: `uploads/${media.filename}`,
    }));
  } catch (error) {
    if (error instanceof NoSuchKey) return new Response("Not found", { status: 404 });
    throw error;
  }
  if (!object.Body) return new Response("Not found", { status: 404 });

  const image = await object.Body.transformToByteArray();
  const responseBody = new ArrayBuffer(image.byteLength);
  new Uint8Array(responseBody).set(image);
  return new Response(responseBody, {
    headers: {
      "Content-Type": media.mime_type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
