import { productCategories } from "@/lib/products/categories";
import type { Product } from "@/lib/products/types";

const men = productCategories[0];
const women = productCategories[1];
const custom = productCategories[2];

const STANDARD_MOQ = "Varies by style and customization — confirmed at quote stage.";
const STANDARD_LEAD_TIME =
  "Confirmed at quote stage, based on order volume and customization.";

const STANDARD_CUSTOMIZATION = [
  "Custom hardware (zippers, snaps, buckles)",
  "Lining material and color options",
  "Custom branding and labeling",
  "Size range adjustment",
];

/**
 * Mock product catalog. This file is the only thing Phase 6 needs to replace
 * with real Prisma queries — lib/products/data.ts already returns Promises
 * and consumers only depend on the `Product` type, not this data source.
 */
export const mockProducts: Product[] = [
  {
    id: "prod-classic-biker-jacket",
    slug: "classic-biker-jacket",
    name: "Classic Biker Jacket",
    category: men,
    shortDescription: "A timeless asymmetric biker silhouette in full-grain cowhide.",
    description:
      "Our Classic Biker Jacket pairs a traditional asymmetric zip front with a tailored, modern fit. Built for wholesale and private-label programs, it's a reliable foundation style that customizes well across hardware, lining, and branding.",
    leatherType: "Full-grain cowhide leather",
    moq: STANDARD_MOQ,
    leadTime: STANDARD_LEAD_TIME,
    featured: false,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [
      { id: "img-1", altText: "Classic Biker Jacket, front view", isPrimary: true },
      { id: "img-2", altText: "Classic Biker Jacket, back view" },
      { id: "img-3", altText: "Classic Biker Jacket, hardware detail" },
    ],
    specifications: [
      { label: "Closure", value: "Asymmetric front zip" },
      { label: "Lining", value: "Quilted polyester (customizable)" },
      { label: "Available Sizes", value: "XS–3XL" },
    ],
    customizationOptions: STANDARD_CUSTOMIZATION,
    seoTitle: "Classic Biker Jacket — Genuine Leather Manufacturing",
    seoDescription:
      "Wholesale and private-label Classic Biker Jacket in full-grain cowhide leather. Request a quote for your specifications and volumes.",
    createdAt: "2026-01-12T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "prod-aviator-bomber-jacket",
    slug: "aviator-bomber-jacket",
    name: "Aviator Bomber Jacket",
    category: men,
    shortDescription: "A classic bomber silhouette in soft top-grain sheepskin.",
    description:
      "The Aviator Bomber Jacket combines a relaxed bomber cut with soft, supple sheepskin leather. Well suited to private-label programs looking for a premium casual outerwear staple.",
    leatherType: "Top-grain sheepskin leather",
    moq: STANDARD_MOQ,
    leadTime: STANDARD_LEAD_TIME,
    featured: false,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [
      { id: "img-1", altText: "Aviator Bomber Jacket, front view", isPrimary: true },
      { id: "img-2", altText: "Aviator Bomber Jacket, collar detail" },
    ],
    specifications: [
      { label: "Closure", value: "Front zip with snap tab collar" },
      { label: "Lining", value: "Shearling or quilted lining (customizable)" },
      { label: "Available Sizes", value: "S–3XL" },
    ],
    customizationOptions: STANDARD_CUSTOMIZATION,
    seoTitle: "Aviator Bomber Jacket — Genuine Leather Manufacturing",
    seoDescription:
      "Wholesale and private-label Aviator Bomber Jacket in top-grain sheepskin leather. Request a quote for your specifications and volumes.",
    createdAt: "2026-01-20T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "prod-cafe-racer-jacket",
    slug: "cafe-racer-jacket",
    name: "Café Racer Jacket",
    category: men,
    shortDescription: "A minimalist, collarless silhouette in full-grain cowhide.",
    description:
      "The Café Racer Jacket offers a clean, collarless design in durable full-grain cowhide — a versatile style for brands seeking a modern, minimal outerwear option.",
    leatherType: "Full-grain cowhide leather",
    moq: STANDARD_MOQ,
    leadTime: STANDARD_LEAD_TIME,
    featured: true,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [
      { id: "img-1", altText: "Café Racer Jacket, front view", isPrimary: true },
      { id: "img-2", altText: "Café Racer Jacket, side profile" },
    ],
    specifications: [
      { label: "Closure", value: "Center front zip" },
      { label: "Lining", value: "Polyester lining (customizable)" },
      { label: "Available Sizes", value: "XS–2XL" },
    ],
    customizationOptions: STANDARD_CUSTOMIZATION,
    seoTitle: "Café Racer Jacket — Genuine Leather Manufacturing",
    seoDescription:
      "Wholesale and private-label Café Racer Jacket in full-grain cowhide leather. Request a quote for your specifications and volumes.",
    createdAt: "2026-02-02T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "prod-fitted-moto-jacket",
    slug: "fitted-moto-jacket",
    name: "Fitted Moto Jacket",
    category: women,
    shortDescription: "A tailored moto silhouette in soft lambskin leather.",
    description:
      "The Fitted Moto Jacket is cut close to the body in soft lambskin leather, offering a refined take on a classic moto style — suited to both wholesale and private-label programs.",
    leatherType: "Lambskin leather",
    moq: STANDARD_MOQ,
    leadTime: STANDARD_LEAD_TIME,
    featured: true,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [
      { id: "img-1", altText: "Fitted Moto Jacket, front view", isPrimary: true },
      { id: "img-2", altText: "Fitted Moto Jacket, back view" },
    ],
    specifications: [
      { label: "Closure", value: "Asymmetric front zip" },
      { label: "Lining", value: "Satin lining (customizable)" },
      { label: "Available Sizes", value: "XXS–XL" },
    ],
    customizationOptions: STANDARD_CUSTOMIZATION,
    seoTitle: "Fitted Moto Jacket — Genuine Leather Manufacturing",
    seoDescription:
      "Wholesale and private-label Fitted Moto Jacket in lambskin leather. Request a quote for your specifications and volumes.",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "prod-longline-leather-trench",
    slug: "longline-leather-trench",
    name: "Longline Leather Trench",
    category: women,
    shortDescription: "An elevated longline silhouette in top-grain cowhide.",
    description:
      "The Longline Leather Trench brings a tailored, floor-grazing silhouette to genuine leather outerwear — a statement piece for premium private-label collections.",
    leatherType: "Top-grain cowhide leather",
    moq: STANDARD_MOQ,
    leadTime: STANDARD_LEAD_TIME,
    featured: false,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [
      { id: "img-1", altText: "Longline Leather Trench, front view", isPrimary: true },
      { id: "img-2", altText: "Longline Leather Trench, belt detail" },
    ],
    specifications: [
      { label: "Closure", value: "Belted wrap front" },
      { label: "Lining", value: "Polyester lining (customizable)" },
      { label: "Available Sizes", value: "XS–2XL" },
    ],
    customizationOptions: STANDARD_CUSTOMIZATION,
    seoTitle: "Longline Leather Trench — Genuine Leather Manufacturing",
    seoDescription:
      "Wholesale and private-label Longline Leather Trench in top-grain cowhide leather. Request a quote for your specifications and volumes.",
    createdAt: "2026-02-10T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "prod-cropped-leather-jacket",
    slug: "cropped-leather-jacket",
    name: "Cropped Leather Jacket",
    category: women,
    shortDescription: "A cropped, versatile layering piece in soft lambskin.",
    description:
      "The Cropped Leather Jacket is designed as a versatile layering piece, offered in soft lambskin leather with a range of customizable finishes.",
    leatherType: "Lambskin leather",
    moq: STANDARD_MOQ,
    leadTime: STANDARD_LEAD_TIME,
    featured: false,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [{ id: "img-1", altText: "Cropped Leather Jacket, front view", isPrimary: true }],
    specifications: [
      { label: "Closure", value: "Front zip" },
      { label: "Lining", value: "Satin lining (customizable)" },
      { label: "Available Sizes", value: "XXS–XL" },
    ],
    customizationOptions: STANDARD_CUSTOMIZATION,
    seoTitle: "Cropped Leather Jacket — Genuine Leather Manufacturing",
    seoDescription:
      "Wholesale and private-label Cropped Leather Jacket in lambskin leather. Request a quote for your specifications and volumes.",
    createdAt: "2026-02-18T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "prod-custom-leather-jacket-program",
    slug: "custom-leather-jacket-program",
    name: "Custom Leather Jacket Program",
    category: custom,
    shortDescription: "Full OEM development of your own leather jacket designs.",
    description:
      "Our Custom Leather Jacket Program covers full OEM development — from pattern-making through sampling and production — built entirely around your designs, materials, and specifications.",
    leatherType: "Buyer-specified — multiple leather types available",
    moq: "Program-based — confirmed at quote stage depending on scope.",
    leadTime: STANDARD_LEAD_TIME,
    featured: true,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [
      { id: "img-1", altText: "Custom leather jacket development samples", isPrimary: true },
    ],
    specifications: [
      { label: "Program Type", value: "OEM / full custom development" },
      { label: "Leather Options", value: "Cowhide, sheepskin, lambskin" },
      { label: "Sampling", value: "Available prior to bulk production" },
    ],
    customizationOptions: [
      "Full pattern and design development",
      "Buyer-supplied or ORBIS-sourced leather",
      "Custom hardware, lining, and branding",
      "Sampling and fit iterations",
    ],
    seoTitle: "Custom Leather Jacket Program — OEM Manufacturing",
    seoDescription:
      "OEM custom leather jacket development and manufacturing. Share your designs and specifications to request a tailored quote.",
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "prod-private-label-outerwear-program",
    slug: "private-label-outerwear-program",
    name: "Private Label Outerwear Program",
    category: custom,
    shortDescription: "Ready-to-brand outerwear styles for private label partners.",
    description:
      "The Private Label Outerwear Program offers a curated set of base outerwear styles that can be branded, adjusted, and packaged under your own label — a faster path to market than full custom development.",
    leatherType: "Buyer-specified — multiple leather types available",
    moq: "Program-based — confirmed at quote stage depending on scope.",
    leadTime: STANDARD_LEAD_TIME,
    featured: false,
    status: "PUBLISHED",
    isSampleContent: true,
    images: [{ id: "img-1", altText: "Private label outerwear styles", isPrimary: true }],
    specifications: [
      { label: "Program Type", value: "Private label" },
      { label: "Base Styles", value: "Selected from existing catalog styles" },
      { label: "Branding", value: "Custom labeling, packaging, and hang tags" },
    ],
    customizationOptions: [
      "Custom branding and labeling",
      "Packaging to your specification",
      "Minor fit and material adjustments",
      "Size range adjustment",
    ],
    seoTitle: "Private Label Outerwear Program — Leather Manufacturing",
    seoDescription:
      "Private label leather outerwear program with custom branding and packaging. Request a quote to get started.",
    createdAt: "2026-01-08T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
];
