"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { inquirySchema } from "@/lib/validation/inquiry";
import { notifyAdminOfInquiry, sendInquiryConfirmation } from "@/lib/email";
import type { InquiryType, InquiryStatus } from "@/app/generated/prisma/enums";

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

const SUCCESS_STATE: InquiryFormState = {
  status: "success",
  message: "We reply within 24 hours.",
  fieldErrors: {},
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;
const MIN_SUBMIT_MS = 1500;

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function toFieldErrors(error: ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return headerList.get("x-real-ip") ?? "unknown";
}

export async function submitInquiry(
  type: InquiryType,
  _prevState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success so
  // bots don't learn their submission was rejected.
  if (readField(formData, "company_website") !== "") {
    return SUCCESS_STATE;
  }

  // Timing trap: scripted bots typically submit far faster than a human can
  // fill out a multi-field form. Pretend success, same as the honeypot.
  const formRenderedAt = Number(readField(formData, "formRenderedAt"));
  if (Number.isFinite(formRenderedAt) && Date.now() - formRenderedAt < MIN_SUBMIT_MS) {
    return SUCCESS_STATE;
  }

  // Validate before touching the database — cheap, and lets validation errors
  // surface even if the database is temporarily unreachable.
  const parsed = inquirySchema.safeParse({
    type,
    name: readField(formData, "name"),
    companyName: readField(formData, "companyName") || undefined,
    email: readField(formData, "email"),
    phone: readField(formData, "phone") || undefined,
    country: readField(formData, "country") || undefined,
    productInterest: readField(formData, "productInterest") || undefined,
    quantityEstimate: readField(formData, "quantityEstimate") || undefined,
    message: readField(formData, "message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const ipAddress = await getClientIp();

  try {
    const recentFromIp = await prisma.inquiry.count({
      where: { ipAddress, createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) } },
    });
    if (recentFromIp >= RATE_LIMIT_MAX) {
      return {
        status: "error",
        message: "Too many requests. Please try again later, or message us directly on WhatsApp.",
        fieldErrors: {},
      };
    }

    const duplicate = await prisma.inquiry.findFirst({
      where: {
        email: data.email,
        message: data.message,
        createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      },
    });
    if (duplicate) {
      return SUCCESS_STATE;
    }

    await prisma.inquiry.create({
      data: {
        type: data.type,
        name: data.name,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        productInterest: data.productInterest,
        quantityEstimate: data.quantityEstimate,
        message: data.message,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to persist inquiry:", error);
    return {
      status: "error",
      message:
        "We couldn't submit your request right now. Please try again, or message us directly on WhatsApp.",
      fieldErrors: {},
    };
  }

  await Promise.all([notifyAdminOfInquiry(data), sendInquiryConfirmation(data)]);

  return SUCCESS_STATE;
}

const INQUIRY_STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"] as const;

export async function updateInquiryStatus(id: string, formData: FormData): Promise<void> {
  await requireAdmin();

  const status = formData.get("status");
  if (typeof status !== "string" || !INQUIRY_STATUSES.includes(status as InquiryStatus)) return;

  await prisma.inquiry.update({ where: { id }, data: { status: status as InquiryStatus } });
  revalidatePath("/admin/inquiries");
}

export async function updateInquiryNotes(id: string, formData: FormData): Promise<void> {
  await requireAdmin();

  const internalNotes = formData.get("internalNotes");
  await prisma.inquiry.update({
    where: { id },
    data: { internalNotes: typeof internalNotes === "string" ? internalNotes.trim() || null : null },
  });
  revalidatePath("/admin/inquiries");
}
