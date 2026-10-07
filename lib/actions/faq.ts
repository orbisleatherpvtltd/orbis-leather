"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { faqItemSchema } from "@/lib/validation/faq";

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseFaqForm(formData: FormData) {
  return faqItemSchema.safeParse({
    question: readField(formData, "question"),
    answer: readField(formData, "answer"),
    category: readField(formData, "category") || undefined,
    sortOrder: readField(formData, "sortOrder") || 0,
    isPublished: formData.get("isPublished") === "on",
  });
}

export async function createFaqItem(formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = parseFaqForm(formData);
  if (!parsed.success) return;

  await prisma.faqItem.create({ data: parsed.data });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function updateFaqItem(id: string, formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = parseFaqForm(formData);
  if (!parsed.success) return;

  await prisma.faqItem.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function deleteFaqItem(id: string): Promise<void> {
  await requireAdmin();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
