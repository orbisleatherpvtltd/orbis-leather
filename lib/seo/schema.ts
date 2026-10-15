import type { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { siteConfig, siteUrl } from "@/lib/site-config";

// `sameAs` is omitted until siteConfig.social has real profile URLs — see the
// comment on that field in lib/site-config.ts.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    logo: new URL("/images/Orbis.logo.png", siteUrl).toString(),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.addressLines[0],
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
  };
}

// No `offers` block — public per-unit pricing isn't published (priced per
// order at quote stage), and Product schema doesn't require one.
export function productJsonLd(product: {
  name: string;
  slug: string;
  description?: string | null;
  images: { url?: string; altText: string }[];
  category: { name: string };
  moq?: string | null;
}) {
  const imageUrls = product.images
    .map((image) => image.url)
    .filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: imageUrls,
    category: product.category.name,
    sku: product.slug,
    ...(product.moq
      ? {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "Minimum Order Quantity",
            value: product.moq,
          },
        }
      : {}),
  };
}

export function faqPageJsonLd(entries: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? new URL(item.href, siteUrl).toString() : undefined,
    })),
  };
}
