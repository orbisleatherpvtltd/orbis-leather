"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { productSchema } from "@/lib/validation/product";

export type ProductFormState = {
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

function parseProductForm(formData: FormData) {
  let images: unknown = [];
  const imagesJson = formData.get("imagesJson");
  if (typeof imagesJson === "string" && imagesJson) {
    try {
      images = JSON.parse(imagesJson);
    } catch {
      images = [];
    }
  }

  const customizationOptions = readField(formData, "customizationOptions")
    .split(",")
    .map((option) => option.trim())
    .filter(Boolean);

  return productSchema.safeParse({
    slug: readField(formData, "slug"),
    name: readField(formData, "name"),
    categoryId: readField(formData, "categoryId"),
    shortDescription: readField(formData, "shortDescription") || undefined,
    description: readField(formData, "description") || undefined,
    leatherType: readField(formData, "leatherType") || undefined,
    priceRange: readField(formData, "priceRange") || undefined,
    moq: readField(formData, "moq") || undefined,
    leadTime: readField(formData, "leadTime") || undefined,
    isPrivateLabel: formData.get("isPrivateLabel") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    status: readField(formData, "status") || "DRAFT",
    seoTitle: readField(formData, "seoTitle") || undefined,
    seoDescription: readField(formData, "seoDescription") || undefined,
    customizationOptions,
    images,
  });
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const { images, ...data } = parsed.data;

  try {
    await prisma.product.create({
      data: {
        ...data,
        images: {
          create: images.map((image, index) => ({
            url: image.url,
            altText: image.altText || data.name,
            isPrimary: image.isPrimary,
            sortOrder: index,
          })),
        },
      },
    });
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      status: "error",
      message: "Could not save the product. The slug may already be in use.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const { images, ...data } = parsed.data;

  try {
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId: id } }),
      prisma.product.update({
        where: { id },
        data: {
          ...data,
          images: {
            create: images.map((image, index) => ({
              url: image.url,
              altText: image.altText || data.name,
              isPrimary: image.isPrimary,
              sortOrder: index,
            })),
          },
        },
      }),
    ]);
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      status: "error",
      message: "Could not save changes. The slug may already be in use.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2025";
}

export async function deleteProduct(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.product.delete({ where: { id } });
  } catch (error) {
    if (!isNotFoundError(error)) console.error("Failed to delete product:", error);
    return;
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductStatus(
  id: string,
  nextStatus: "DRAFT" | "PUBLISHED",
): Promise<void> {
  await requireAdmin();
  try {
    await prisma.product.update({ where: { id }, data: { status: nextStatus } });
  } catch (error) {
    if (!isNotFoundError(error)) console.error("Failed to update product status:", error);
    return;
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductFeatured(id: string, nextFeatured: boolean): Promise<void> {
  await requireAdmin();
  try {
    await prisma.product.update({ where: { id }, data: { isFeatured: nextFeatured } });
  } catch (error) {
    if (!isNotFoundError(error)) console.error("Failed to update product:", error);
    return;
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
}
