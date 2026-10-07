"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { testimonialSchema } from "@/lib/validation/testimonial";

export type TestimonialFormState = {
  status: "idle" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

function readField(formData: FormData, key: string): string {
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

function parseTestimonialForm(formData: FormData) {
  return testimonialSchema.safeParse({
    companyName: readField(formData, "companyName"),
    personName: readField(formData, "personName") || undefined,
    role: readField(formData, "role") || undefined,
    quote: readField(formData, "quote"),
    logoUrl: readField(formData, "logoUrl") || undefined,
    isPublished: formData.get("isPublished") === "on",
    sortOrder: readField(formData, "sortOrder") || 0,
  });
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  try {
    await prisma.testimonial.create({ data: parsed.data });
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return {
      status: "error",
      message: "Could not save the testimonial. Please try again.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  try {
    await prisma.testimonial.update({ where: { id }, data: parsed.data });
  } catch (error) {
    if (isNotFoundError(error)) {
      return {
        status: "error",
        message: "Testimonial not found — it may have already been deleted.",
        fieldErrors: {},
      };
    }
    console.error("Failed to update testimonial:", error);
    return {
      status: "error",
      message: "Could not save changes. Please try again.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2025";
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.testimonial.delete({ where: { id } });
  } catch (error) {
    if (!isNotFoundError(error)) console.error("Failed to delete testimonial:", error);
    return;
  }
  revalidatePath("/admin/testimonials");
}

export async function toggleTestimonialPublished(id: string, nextPublished: boolean): Promise<void> {
  await requireAdmin();
  try {
    await prisma.testimonial.update({ where: { id }, data: { isPublished: nextPublished } });
  } catch (error) {
    if (!isNotFoundError(error)) console.error("Failed to update testimonial:", error);
    return;
  }
  revalidatePath("/admin/testimonials");
}
