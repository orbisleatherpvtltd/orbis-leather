export type ProductCategorySlug =
  | "mens-leather-jackets"
  | "womens-leather-jackets"
  | "custom-private-label";

export type ProductCategory = {
  slug: ProductCategorySlug;
  name: string;
  description: string;
};

export type ProductImage = {
  id: string;
  url?: string;
  altText: string;
  isPrimary?: boolean;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductStatus = "DRAFT" | "PUBLISHED";

/**
 * Domain-level product shape consumed by the UI. Deliberately decoupled from
 * the Prisma model so the data-access layer (lib/products/data.ts) can be
 * backed by mock data now and swapped for database queries later (Phase 6)
 * without changing any component.
 */
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  leatherType?: string;
  /** Internal/admin field. Never rendered publicly — see "Request Quote" CTA. */
  priceRange?: string;
  moq?: string;
  leadTime?: string;
  featured: boolean;
  status: ProductStatus;
  images: ProductImage[];
  specifications: ProductSpecification[];
  customizationOptions: string[];
  seoTitle?: string;
  seoDescription?: string;
  /** Marks demo/placeholder catalog entries so they're never mistaken for real inventory. */
  isSampleContent: boolean;
  createdAt: string;
  updatedAt: string;
};
