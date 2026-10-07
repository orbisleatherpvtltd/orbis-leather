import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/db";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

type ImageType = { ext: string; check: (bytes: Buffer) => boolean };

/**
 * Validated by magic bytes, not just the declared/extension MIME type, so a
 * renamed or mislabeled file can't slip past the allow-list.
 */
const ALLOWED_TYPES: Record<string, ImageType> = {
  "image/jpeg": {
    ext: "jpg",
    check: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  "image/png": {
    ext: "png",
    check: (b) =>
      b[0] === 0x89 &&
      b[1] === 0x50 &&
      b[2] === 0x4e &&
      b[3] === 0x47 &&
      b[4] === 0x0d &&
      b[5] === 0x0a &&
      b[6] === 0x1a &&
      b[7] === 0x0a,
  },
  "image/webp": {
    ext: "webp",
    check: (b) =>
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50,
  },
};

export class MediaValidationError extends Error {}

export async function saveUpload(file: File, altText?: string) {
  if (file.size === 0) {
    throw new MediaValidationError("The uploaded file is empty.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new MediaValidationError("File exceeds the 5MB size limit.");
  }

  const declaredType = ALLOWED_TYPES[file.type];
  if (!declaredType) {
    throw new MediaValidationError("Only JPEG, PNG, or WebP images are allowed.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!declaredType.check(buffer)) {
    throw new MediaValidationError("File contents do not match the declared image type.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${declaredType.ext}`;
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return prisma.mediaAsset.create({
    data: {
      url: `/uploads/${filename}`,
      filename,
      mimeType: file.type,
      size: file.size,
      altText: altText?.trim() || null,
    },
  });
}
