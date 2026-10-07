import { prisma } from "@/lib/db";
import { productCategories } from "@/lib/products/categories";
import { dummyProducts } from "@/lib/products/dummy-products";
import type {
  Product as PrismaProduct,
  ProductCategory as PrismaProductCategory,
  ProductImage as PrismaProductImage,
} from "@/app/generated/prisma/client";
import type {
  Product,
  ProductCategory,
  ProductCategorySlug,
  ProductSpecification,
} from "@/lib/products/types";

/**
 * Abstract product data-access layer, now backed by Prisma. Every function
 * still returns plain `Product`/`ProductCategory` domain values so the UI
 * components built in earlier phases require no changes.
 */

const productInclude = {
  category: true,
  images: { orderBy: { sortOrder: "asc" as const } },
};

type ProductRow = PrismaProduct & {
  category: PrismaProductCategory | null;
  images: PrismaProductImage[];
};

function toDomainCategory(
  category: { slug: string; name: string; description: string | null } | null,
): ProductCategory {
  if (!category) return productCategories[0];
  return {
    slug: category.slug as ProductCategorySlug,
    name: category.name,
    description: category.description ?? "",
  };
}

function toDomainProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: toDomainCategory(row.category),
    shortDescription: row.shortDescription ?? "",
    description: row.description ?? "",
    leatherType: row.leatherType ?? undefined,
    priceRange: row.priceRange ?? undefined,
    moq: row.moq ?? undefined,
    leadTime: row.leadTime ?? undefined,
    featured: row.isFeatured,
    status: row.status,
    images: row.images.map((image) => ({
      id: image.id,
      url: image.url,
      altText: image.altText,
      isPrimary: image.isPrimary,
    })),
    specifications: Array.isArray(row.specifications)
      ? (row.specifications as unknown as ProductSpecification[])
      : [],
    customizationOptions: row.customizationOptions,
    seoTitle: row.seoTitle ?? undefined,
    seoDescription: row.seoDescription ?? undefined,
    isSampleContent: row.isSampleContent,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const rows = await prisma.productCategory.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return productCategories;
    return rows.map((row) => ({
      slug: row.slug as ProductCategorySlug,
      name: row.name,
      description: row.description ?? "",
    }));
  } catch (error) {
    console.warn("getCategories: falling back to static categories", error);
    return productCategories;
  }
}

export async function getCategory(slug: ProductCategorySlug): Promise<ProductCategory | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { status: "PUBLISHED" },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });
    if (rows.length === 0) return dummyProducts;
    return rows.map(toDomainProduct);
  } catch (error) {
    console.warn("getPublishedProducts: falling back to sample catalog", error);
    return dummyProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { status: "PUBLISHED", isFeatured: true },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });
    if (rows.length === 0) return dummyProducts.filter((product) => product.featured);
    return rows.map(toDomainProduct);
  } catch (error) {
    console.warn("getFeaturedProducts: falling back to sample catalog", error);
    return dummyProducts.filter((product) => product.featured);
  }
}

export async function getProductsByCategory(slug: ProductCategorySlug): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { status: "PUBLISHED", category: { slug } },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });
    if (rows.length === 0) return dummyProducts.filter((product) => product.category.slug === slug);
    return rows.map(toDomainProduct);
  } catch (error) {
    console.warn("getProductsByCategory: falling back to sample catalog", error);
    return dummyProducts.filter((product) => product.category.slug === slug);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const row = await prisma.product.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: productInclude,
    });
    if (row) return toDomainProduct(row);
    return dummyProducts.find((product) => product.slug === slug) ?? null;
  } catch (error) {
    console.warn("getProductBySlug: falling back to sample catalog", error);
    return dummyProducts.find((product) => product.slug === slug) ?? null;
  }
}

export async function getProductSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    if (rows.length === 0) return dummyProducts.map((product) => product.slug);
    return rows.map((row) => row.slug);
  } catch (error) {
    console.warn("getProductSlugs: falling back to sample catalog", error);
    return dummyProducts.map((product) => product.slug);
  }
}
