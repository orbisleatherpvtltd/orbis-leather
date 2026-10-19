"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { inquirySchema } from "@/lib/validation/inquiry";
import { notifyAdminOfInquiry, sendInquiryConfirmation } from "@/lib/email";
import { InquiryFileError, saveInquiryFiles } from "@/lib/inquiries/files";
import { isGeneralInquiry } from "@/lib/inquiries/fields";
import type { InquiryStatus } from "@/app/generated/prisma/enums";

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;
const MIN_SUBMIT_MS = 1500;

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readList(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is string => typeof value === "string" && value.trim() !== "")
    .map((value) => value.trim());
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
  _prevState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success so
  // bots don't learn their submission was rejected.
  if (readField(formData, "company_website") !== "") {
    redirect("/contact/thank-you");
  }

  // Timing trap: scripted bots typically submit far faster than a human can
  // fill out a multi-field form. Pretend success, same as the honeypot.
  const formRenderedAt = Number(readField(formData, "formRenderedAt"));
  if (Number.isFinite(formRenderedAt) && Date.now() - formRenderedAt < MIN_SUBMIT_MS) {
    redirect("/contact/thank-you");
  }

  const parsed = inquirySchema.safeParse({
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone") || undefined,
    companyName: readField(formData, "companyName") || undefined,
    country: readField(formData, "country"),
    buyerType: readField(formData, "buyerType"),
    inquiryType: readField(formData, "inquiryType"),
    jacketStyle: readField(formData, "jacketStyle") || undefined,
    quantityPerStyle: readField(formData, "quantityPerStyle") || undefined,
    numberOfStyles: readField(formData, "numberOfStyles") || undefined,
    customEmbroidery: readField(formData, "customEmbroidery") || undefined,
    embroideryPlacement: readList(formData, "embroideryPlacement"),
    ownLabels: readField(formData, "ownLabels") || undefined,
    leatherType: readField(formData, "leatherType") || undefined,
    sampleFirst: readField(formData, "sampleFirst") || undefined,
    delivery: readField(formData, "delivery") || undefined,
    targetPrice: readField(formData, "targetPrice") || undefined,
    message: readField(formData, "message") || undefined,
    heardAbout: readField(formData, "heardAbout") || undefined,
    consent: readField(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const general = isGeneralInquiry(data.inquiryType);
  const ipAddress = await getClientIp();
  let fileUrls: string[] = [];

  try {
    const uploads = formData
      .getAll("designFiles")
      .filter((value): value is File => value instanceof File);
    fileUrls = general ? [] : await saveInquiryFiles(uploads);
  } catch (error) {
    if (error instanceof InquiryFileError) {
      return {
        status: "error",
        message: "Please correct the highlighted fields.",
        fieldErrors: { designFiles: error.message },
      };
    }
    console.error("Failed to store inquiry files:", error);
    return {
      status: "error",
      message:
        "We couldn't submit your request right now. Please try again, or message us directly on WhatsApp.",
      fieldErrors: {},
    };
  }

  const rows: Array<[string, string]> = [
    ["Full name", data.name],
    ["Email", data.email],
    ["Phone or WhatsApp", data.phone ?? ""],
    ["Company or brand name", data.companyName ?? ""],
    ["Country", data.country],
    ["I am a", data.buyerType],
    ["Inquiry type", data.inquiryType],
    ["Jacket style", general ? "" : (data.jacketStyle ?? "")],
    ["Quantity per style", general ? "" : (data.quantityPerStyle ?? "")],
    ["Number of styles", general ? "" : (data.numberOfStyles ?? "")],
    ["Custom embroidery?", general ? "" : (data.customEmbroidery ?? "")],
    [
      "Where should the embroidery go?",
      !general && data.customEmbroidery === "Yes" ? (data.embroideryPlacement ?? []).join(", ") : "",
    ],
    ["Do you need your own labels or tags?", general ? "" : (data.ownLabels ?? "")],
    ["Leather type", general ? "" : (data.leatherType ?? "")],
    ["Sample first?", general ? "" : (data.sampleFirst ?? "")],
    ["When do you need delivery?", general ? "" : (data.delivery ?? "")],
    ["Target price per piece (USD)", general ? "" : (data.targetPrice ?? "")],
    ["Design files", fileUrls.join("\n")],
    ["Anything else we should know?", data.message ?? ""],
    ["How did you hear about us?", data.heardAbout ?? ""],
  ].filter((entry): entry is [string, string] => entry[1] !== "");

  const message =
    data.message ||
    `${data.inquiryType}${data.quantityPerStyle ? ` - ${data.quantityPerStyle} pieces per style` : ""}`;

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
        message,
        createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      },
    });
    if (duplicate) {
      redirect("/contact/thank-you");
    }

    await prisma.inquiry.create({
      data: {
        type: general ? "CONTACT" : "QUOTE",
        name: data.name,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        productInterest: data.inquiryType,
        quantityEstimate: data.quantityPerStyle,
        message,
        details: Object.fromEntries(rows),
        ipAddress,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      String((error as { digest: unknown }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("Failed to persist inquiry:", error);
    return {
      status: "error",
      message:
        "We couldn't submit your request right now. Please try again, or message us directly on WhatsApp.",
      fieldErrors: {},
    };
  }

  await Promise.all([
    notifyAdminOfInquiry({
      name: data.name,
      email: data.email,
      inquiryType: data.inquiryType,
      quantityPerStyle: data.quantityPerStyle,
      country: data.country,
      rows,
    }),
    sendInquiryConfirmation({ name: data.name, email: data.email }),
  ]);

  redirect("/contact/thank-you");
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
