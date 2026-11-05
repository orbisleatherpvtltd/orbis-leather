import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/lib/products/data";
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
  "/faq",
  "/contact",
  "/request-quote",
  "/privacy-policy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: new URL(path || "/", siteUrl).toString(),
  }));

  try {
    const productSlugs = await getProductSlugs();
    const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
      url: new URL(`/products/${slug}`, siteUrl).toString(),
    }));
    return [...staticEntries, ...productEntries];
  } catch (error) {
    console.error("Failed to load slugs for sitemap, falling back to static routes only:", error);
    return staticEntries;
  }
}
