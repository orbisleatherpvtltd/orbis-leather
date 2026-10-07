import { z } from "zod";

export const blogPostSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  title: z.string().trim().min(1, "Title is required."),
  excerpt: z.string().trim().optional(),
  content: z.string().trim().optional(),
  heroImageUrl: z.string().trim().optional(),
  categoryId: z.string().trim().optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().trim().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  publishedAt: z.string().trim().optional(),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  ogImageUrl: z.string().trim().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
