"use server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { saveUpload, MediaValidationError } from "@/lib/media/storage";
import { prisma } from "@/lib/db";

export type MediaUploadState = {
  status: "idle" | "success" | "error";
  message: string;
  url?: string;
  assetId?: string;
};

export async function uploadMedia(
  _prevState: MediaUploadState,
  formData: FormData,
): Promise<MediaUploadState> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { status: "error", message: "No file provided." };
  }

  const altText = formData.get("altText");

  try {
    const asset = await saveUpload(file, typeof altText === "string" ? altText : undefined);
    return { status: "success", message: "Uploaded.", url: asset.url, assetId: asset.id };
  } catch (error) {
    if (error instanceof MediaValidationError) {
      return { status: "error", message: error.message };
    }
    console.error("Media upload failed:", error);
    return { status: "error", message: "Upload failed. Please try again." };
  }
}

export async function listMediaAssets() {
  await requireAdmin();
  return prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 60 });
}
