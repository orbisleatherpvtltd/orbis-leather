import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site-config";

export type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article";
  /**
   * "template" (default) lets the root layout's title.template
   * ("%s | ORBIS Signature Leather") wrap this title. Use "absolute" to
   * render this title exactly as-is, bypassing the template — for pages
   * whose title already is the site name (e.g. the homepage), where the
   * template would otherwise duplicate it.
   */
  titleMode?: "template" | "absolute";
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  titleMode = "template",
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteUrl).toString();
  const images = image ? [{ url: image.url, alt: image.alt }] : undefined;

  return {
    title: titleMode === "absolute" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}
