import { z } from "zod";

export const productImageSchema = z.object({
  url: z.string().trim().min(1),
  altText: z.string().trim().default(""),
  isPrimary: z.boolean().default(false),
});

export const productSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  name: z.string().trim().min(1, "Name is required."),
  categoryId: z.string().trim().min(1, "Category is required."),
  shortDescription: z.string().trim().optional(),
  description: z.string().trim().optional(),
  leatherType: z.string().trim().optional(),
  priceRange: z.string().trim().optional(),
  moq: z.string().trim().optional(),
  leadTime: z.string().trim().optional(),
  isPrivateLabel: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  customizationOptions: z.array(z.string()).default([]),
  images: z.array(productImageSchema).default([]),
});

export type ProductInput = z.infer<typeof productSchema>;
