export type BlogCategorySlug = "company-news" | "industry-insights" | "care-guides";

export type BlogCategory = {
  slug: BlogCategorySlug;
  name: string;
  description: string;
};

export type BlogImage = {
  url?: string;
  altText: string;
};

export type BlogPostStatus = "DRAFT" | "PUBLISHED";

/**
 * Domain-level blog post shape consumed by the UI. Deliberately decoupled
 * from the Prisma model so the data-access layer (lib/blog/data.ts) can be
 * backed by mock data now and swapped for database queries later (Phase 6)
 * without changing any component.
 */
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  heroImage: BlogImage;
  category: BlogCategory;
  tags: string[];
  author: string;
  publishedAt: string;
  status: BlogPostStatus;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: BlogImage;
  /** Marks demo/placeholder content so it's never mistaken for verified company publications. */
  isSampleContent: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BlogListParams = {
  page?: number;
  pageSize?: number;
  category?: BlogCategorySlug;
  tag?: string;
  query?: string;
};

export type BlogListResult = {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
