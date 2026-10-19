import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "inquiries");

const ALLOWED_EXTENSIONS = new Set(["pdf", "ai", "svg", "png", "jpg", "jpeg"]);

export class InquiryFileError extends Error {}

function extensionOf(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return ext;
}

function looksLikeHtmlOrScript(buffer: Buffer) {
  const start = buffer.subarray(0, 64).toString("utf8").trimStart().toLowerCase();
  return start.startsWith("<html") || start.startsWith("<!doctype") || start.startsWith("<script") || start.startsWith("<?php");
}

function matchesDeclaredType(ext: string, buffer: Buffer) {
  if (looksLikeHtmlOrScript(buffer)) return false;

  if (ext === "png") {
    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  }
  if (ext === "jpg" || ext === "jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (ext === "pdf") {
    return buffer.subarray(0, 5).toString("utf8") === "%PDF-";
  }
  if (ext === "svg") {
    const text = buffer.subarray(0, 400).toString("utf8").toLowerCase();
    return text.includes("<svg") && !text.includes("<script");
  }
  return ext === "ai";
}

export async function saveInquiryFiles(files: File[]) {
  const selected = files.filter((file) => file.size > 0);
  if (selected.length > MAX_FILES) {
    throw new InquiryFileError("Upload up to 5 files.");
  }

  const saved: string[] = [];
  if (selected.length === 0) return saved;

  await mkdir(UPLOAD_DIR, { recursive: true });

  for (const file of selected) {
    const ext = extensionOf(file.name);
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      throw new InquiryFileError("Upload PDF, AI, SVG, PNG, or JPG files only.");
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new InquiryFileError("Each file must be 10 MB or smaller.");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!matchesDeclaredType(ext, buffer)) {
      throw new InquiryFileError("One of the files does not match an allowed file type.");
    }

    const filename = `${randomUUID()}.${ext === "jpeg" ? "jpg" : ext}`;
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    saved.push(`/uploads/inquiries/${filename}`);
  }

  return saved;
}
