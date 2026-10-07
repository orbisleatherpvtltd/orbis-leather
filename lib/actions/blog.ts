"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { blogPostSchema } from "@/lib/validation/blog";

export type BlogPostFormState = {
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

function parseBlogPostForm(formData: FormData) {
  const tags = readField(formData, "tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return blogPostSchema.safeParse({
    slug: readField(formData, "slug"),
    title: readField(formData, "title"),
    excerpt: readField(formData, "excerpt") || undefined,
    content: readField(formData, "content") || undefined,
    heroImageUrl: readField(formData, "heroImageUrl") || undefined,
    categoryId: readField(formData, "categoryId") || undefined,
    tags,
    author: readField(formData, "author") || undefined,
    status: readField(formData, "status") || "DRAFT",
    publishedAt: readField(formData, "publishedAt") || undefined,
    seoTitle: readField(formData, "seoTitle") || undefined,
    seoDescription: readField(formData, "seoDescription") || undefined,
    ogImageUrl: readField(formData, "ogImageUrl") || undefined,
  });
}

export async function createBlogPost(
  _prevState: BlogPostFormState,
  formData: FormData,
): Promise<BlogPostFormState> {
  await requireAdmin();

  const parsed = parseBlogPostForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const { categoryId, publishedAt, ...data } = parsed.data;

  try {
    await prisma.blogPost.create({
      data: {
        ...data,
        categoryId: categoryId || null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return {
      status: "error",
      message: "Could not save the post. The slug may already be in use.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  _prevState: BlogPostFormState,
  formData: FormData,
): Promise<BlogPostFormState> {
  await requireAdmin();

  const parsed = parseBlogPostForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const { categoryId, publishedAt, ...data } = parsed.data;

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        categoryId: categoryId || null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return {
      status: "error",
      message: "Could not save changes. The slug may already be in use.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2025";
}

export async function deleteBlogPost(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.blogPost.delete({ where: { id } });
  } catch (error) {
    if (!isNotFoundError(error)) console.error("Failed to delete blog post:", error);
    return;
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function toggleBlogPostStatus(
  id: string,
  nextStatus: "DRAFT" | "PUBLISHED",
): Promise<void> {
  await requireAdmin();
  try {
    await prisma.blogPost.update({ where: { id }, data: { status: nextStatus } });
  } catch (error) {
    if (!isNotFoundError(error)) console.error("Failed to update blog post status:", error);
    return;
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
