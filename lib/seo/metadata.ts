import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site-config";

const BRAND_SUFFIX = " - ORBIS Leather";
const TITLE_LIMIT = 60;

function composeTitle(title: string, titleMode: "template" | "absolute") {
  if (titleMode === "absolute") {
    return title.length <= TITLE_LIMIT ? title : title.slice(0, TITLE_LIMIT).trimEnd();
  }

  const full = `${title}${BRAND_SUFFIX}`;
  if (full.length <= TITLE_LIMIT) return full;

  const room = TITLE_LIMIT - BRAND_SUFFIX.length;
  return `${title.slice(0, room).trimEnd()}${BRAND_SUFFIX}`;
}

export type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article";
  /**
   * "template" (default) appends " - ORBIS Leather" and keeps the full
   * title within 60 characters. Use "absolute" when the title is already
   * the complete search result string.
   */
  titleMode?: "template" | "absolute";
  /** Set true for pages with no real content yet (sample/placeholder data). */
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  titleMode = "template",
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteUrl).toString();
  const images = image ? [{ url: image.url, alt: image.alt }] : undefined;
  const fullTitle = composeTitle(title, titleMode);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.brandName,
      type,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}
