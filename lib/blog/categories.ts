import type { BlogCategory } from "@/lib/blog/types";

export const blogCategories: BlogCategory[] = [
  {
    slug: "company-news",
    name: "Company News",
    description: "Updates from our manufacturing floor, programs, and partnerships.",
  },
  {
    slug: "industry-insights",
    name: "Industry Insights",
    description: "Leather materials, sourcing, and manufacturing knowledge for wholesale buyers.",
  },
  {
    slug: "care-guides",
    name: "Care Guides",
    description: "Guidance on caring for and maintaining leather goods over their lifespan.",
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}
