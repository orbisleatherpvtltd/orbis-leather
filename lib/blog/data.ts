import { prisma } from "@/lib/db";
import { blogCategories } from "@/lib/blog/categories";
import { mockBlogPosts } from "@/lib/blog/mock-data";
import type { BlogPost as PrismaBlogPost, BlogCategory as PrismaBlogCategory } from "@/app/generated/prisma/client";
import type {
  BlogCategory,
  BlogCategorySlug,
  BlogListParams,
  BlogListResult,
  BlogPost,
} from "@/lib/blog/types";

/**
 * Abstract blog data-access layer, now backed by Prisma. Every function still
 * returns plain `BlogPost`/`BlogCategory` domain values so the UI components
 * built in earlier phases require no changes.
 */

const DEFAULT_PAGE_SIZE = 6;

type BlogPostRow = PrismaBlogPost & { category: PrismaBlogCategory | null };

function toDomainCategory(category: PrismaBlogCategory | null): BlogCategory {
  if (!category) return blogCategories[0];
  return {
    slug: category.slug as BlogCategorySlug,
    name: category.name,
    description: category.description ?? "",
  };
}

function toDomainPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    heroImage: { url: row.heroImageUrl ?? undefined, altText: row.title },
    category: toDomainCategory(row.category),
    tags: row.tags,
    author: row.author ?? "ORBIS Signature Leather",
    publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
    status: row.status,
    seoTitle: row.seoTitle ?? undefined,
    seoDescription: row.seoDescription ?? undefined,
    ogImage: row.ogImageUrl ? { url: row.ogImageUrl, altText: row.title } : undefined,
    isSampleContent: row.isSampleContent,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

const publishedWhere = {
  status: "PUBLISHED" as const,
  OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
};

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const rows = await prisma.blogCategory.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return blogCategories;
    return rows.map((row) => ({
      slug: row.slug as BlogCategorySlug,
      name: row.name,
      description: row.description ?? "",
    }));
  } catch (error) {
    console.warn("getBlogCategories: falling back to static categories", error);
    return blogCategories;
  }
}

export async function getBlogCategory(slug: BlogCategorySlug): Promise<BlogCategory | null> {
  const categories = await getBlogCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: publishedWhere,
      include: { category: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length === 0) return mockBlogPosts;
    return rows.map(toDomainPost);
  } catch (error) {
    console.warn("getPublishedPosts: falling back to sample catalog", error);
    return mockBlogPosts;
  }
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const posts = await getPublishedPosts();
  return posts[0] ?? null;
}

export async function listPosts(params: BlogListParams = {}): Promise<BlogListResult> {
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE, category, tag, query } = params;

  let posts = await getPublishedPosts();

  if (category) {
    posts = posts.filter((post) => post.category.slug === category);
  }

  if (tag) {
    posts = posts.filter((post) => post.tags.includes(tag));
  }

  if (query) {
    const normalized = query.trim().toLowerCase();
    if (normalized) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(normalized) ||
          post.excerpt.toLowerCase().includes(normalized),
      );
    }
  }

  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    posts: posts.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, ...publishedWhere },
      include: { category: true },
    });
    if (row) return toDomainPost(row);
    return mockBlogPosts.find((post) => post.slug === slug) ?? null;
  } catch (error) {
    console.warn("getPostBySlug: falling back to sample catalog", error);
    return mockBlogPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: publishedWhere,
      select: { slug: true },
    });
    if (rows.length === 0) return mockBlogPosts.map((post) => post.slug);
    return rows.map((row) => row.slug);
  } catch (error) {
    console.warn("getPostSlugs: falling back to sample catalog", error);
    return mockBlogPosts.map((post) => post.slug);
  }
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  const others = posts.filter((candidate) => candidate.id !== post.id);

  const sameCategory = others.filter((candidate) => candidate.category.slug === post.category.slug);
  const sharesTag = others.filter(
    (candidate) =>
      !sameCategory.includes(candidate) && candidate.tags.some((tag) => post.tags.includes(tag)),
  );

  return [...sameCategory, ...sharesTag, ...others]
    .filter((candidate, index, all) => all.indexOf(candidate) === index)
    .slice(0, limit);
}
