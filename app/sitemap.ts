import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/lib/products/data";
import { getPostSlugs } from "@/lib/blog/data";
import { siteUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";

const staticRoutes = [
  "",
  "/about",
  "/capabilities",
  "/products",
  "/products/mens-leather-jackets",
  "/products/womens-leather-jackets",
  "/products/custom-private-label",
  "/quality-compliance",
  "/blog",
  "/faq",
  "/contact",
  "/request-quote",
  "/privacy-policy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
  }));

  let productSlugs: string[] = [];
  let postSlugs: string[] = [];
  try {
    [productSlugs, postSlugs] = await Promise.all([getProductSlugs(), getPostSlugs()]);
  } catch (error) {
    console.error("Failed to load slugs for sitemap — falling back to static routes only:", error);
    return staticEntries;
  }

  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: new URL(`/products/${slug}`, siteUrl).toString(),
    lastModified: new Date(),
  }));

  const postEntries: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: new URL(`/blog/${slug}`, siteUrl).toString(),
    lastModified: new Date(),
  }));

  return [...staticEntries, ...productEntries, ...postEntries];
}
