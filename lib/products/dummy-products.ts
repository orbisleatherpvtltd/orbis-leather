import { dummyImage } from "@/lib/dummy-images";
import { productCategories } from "@/lib/products/categories";
import type { Product } from "@/lib/products/types";

const timestamp = "2026-01-15T00:00:00.000Z";

function categoryFor(slug: Product["category"]["slug"]) {
  return productCategories.find((category) => category.slug === slug)!;
}

function images(offset: number, altBase: string): Product["images"] {
  return [0, 1, 2].map((i) => ({
    id: `dummy-img-${offset}-${i}`,
    url: dummyImage(offset + i, i === 0 ? 1200 : 800),
    altText: `${altBase} — view ${i + 1} (placeholder)`,
    isPrimary: i === 0,
  }));
}

/**
 * Placeholder catalog shown whenever the database has no published products
 * yet (or is unreachable), so product pages never render empty. Every entry
 * is flagged isSampleContent so the UI can label it clearly.
 */
export const dummyProducts: Product[] = [
  {
    id: "dummy-classic-biker-jacket",
    slug: "classic-biker-jacket",
    name: "Classic Biker Jacket",
    category: categoryFor("mens-leather-jackets"),
    shortDescription: "An asymmetric-zip biker jacket in full-grain cowhide, built for wholesale runs.",
    description:
      "A tailored asymmetric-zip biker jacket cut from full-grain cowhide, reinforced at the seams for durability. Available in a full men's size run with configurable hardware and lining for private-label programs.",
    leatherType: "Full-grain cowhide",
    moq: "50 units / colorway",
    leadTime: "30–45 days",
    featured: true,
    status: "PUBLISHED",
    images: images(0, "Classic Biker Jacket"),
    specifications: [
      { label: "Leather Type", value: "Full-grain cowhide" },
      { label: "Lining", value: "Quilted polyester" },
      { label: "Hardware", value: "YKK zippers, antique brass hardware" },
      { label: "Available Sizes", value: "XS – 3XL" },
    ],
    customizationOptions: [
      "Custom color and finish options",
      "Logo embossing or branded hardware",
      "Alternate lining materials",
      "Private-label neck tags and packaging",
    ],
    isSampleContent: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: "dummy-aviator-bomber-jacket",
    slug: "aviator-bomber-jacket",
    name: "Aviator Bomber Jacket",
    category: categoryFor("mens-leather-jackets"),
    shortDescription: "A shearling-collar aviator bomber in oiled lambskin for cold-weather ranges.",
    description:
      "A classic aviator silhouette in oiled lambskin with a detachable shearling collar, ribbed cuffs, and hem. Built for cold-weather wholesale programs and easily adapted for private-label branding.",
    leatherType: "Oiled lambskin",
    moq: "50 units / colorway",
    leadTime: "35–50 days",
    featured: true,
    status: "PUBLISHED",
    images: images(1, "Aviator Bomber Jacket"),
    specifications: [
      { label: "Leather Type", value: "Oiled lambskin" },
      { label: "Collar", value: "Detachable shearling" },
      { label: "Lining", value: "Satin body, wool-blend sleeves" },
      { label: "Available Sizes", value: "S – 2XL" },
    ],
    customizationOptions: [
      "Collar material substitution",
      "Custom lining colorways",
      "Branded snap or zipper pulls",
    ],
    isSampleContent: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: "dummy-fitted-moto-jacket",
    slug: "fitted-moto-jacket",
    name: "Fitted Moto Jacket",
    category: categoryFor("womens-leather-jackets"),
    shortDescription: "A cropped, fitted moto jacket in soft lambskin with quilted shoulder panels.",
    description:
      "A cropped moto silhouette in soft lambskin, with quilted shoulder detailing and a nipped waist. Sized and graded for women's wholesale programs, with sampling available before bulk production.",
    leatherType: "Soft lambskin",
    moq: "50 units / colorway",
    leadTime: "30–45 days",
    featured: true,
    status: "PUBLISHED",
    images: images(2, "Fitted Moto Jacket"),
    specifications: [
      { label: "Leather Type", value: "Soft lambskin" },
      { label: "Lining", value: "Silk-touch polyester" },
      { label: "Hardware", value: "Nickel-finish zippers and studs" },
      { label: "Available Sizes", value: "XXS – XL" },
    ],
    customizationOptions: [
      "Custom color and finish options",
      "Quilting pattern adjustments",
      "Branded lining and hang tags",
    ],
    isSampleContent: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: "dummy-longline-trench-coat",
    slug: "longline-trench-coat",
    name: "Longline Leather Trench Coat",
    category: categoryFor("womens-leather-jackets"),
    shortDescription: "A belted, longline leather trench in nappa leather for outerwear programs.",
    description:
      "A belted longline trench cut from supple nappa leather, with a structured collar and welt pockets. Suited to premium outerwear ranges and private-label collections requiring a longer silhouette.",
    leatherType: "Nappa leather",
    moq: "30 units / colorway",
    leadTime: "40–55 days",
    featured: false,
    status: "PUBLISHED",
    images: images(3, "Longline Leather Trench Coat"),
    specifications: [
      { label: "Leather Type", value: "Nappa leather" },
      { label: "Closure", value: "Belted wrap with snap-through buttons" },
      { label: "Lining", value: "Twill, full body" },
      { label: "Available Sizes", value: "XS – XL" },
    ],
    customizationOptions: [
      "Belt and collar style variations",
      "Custom lining prints",
      "Private-label hardware branding",
    ],
    isSampleContent: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: "dummy-oem-development-program",
    slug: "oem-development-program",
    name: "OEM Development Program",
    category: categoryFor("custom-private-label"),
    shortDescription: "Full OEM production built to your tech pack, from pattern to finished goods.",
    description:
      "An end-to-end OEM program: we produce to your existing designs, tech packs, and material specifications, with sampling rounds prior to bulk production and full QC documentation on shipment.",
    leatherType: "Buyer-specified",
    moq: "Confirmed per tech pack",
    leadTime: "Confirmed at quote stage",
    featured: true,
    status: "PUBLISHED",
    images: images(4, "OEM Development Program"),
    specifications: [
      { label: "Program Type", value: "OEM / buyer-specified design" },
      { label: "Sampling", value: "Pre-production samples included" },
      { label: "Documentation", value: "Full QC and export paperwork" },
    ],
    customizationOptions: [
      "Full materials sourcing to spec",
      "Custom sizing and grading",
      "Buyer-supplied trims and hardware",
    ],
    isSampleContent: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: "dummy-private-label-starter-kit",
    slug: "private-label-starter-program",
    name: "Private Label Starter Program",
    category: categoryFor("custom-private-label"),
    shortDescription: "A lower-MOQ private-label entry point for new leather goods brands.",
    description:
      "A private-label program designed for smaller initial runs, letting new brands develop a signature style with our design and branding support before scaling into larger wholesale volumes.",
    leatherType: "Buyer-specified",
    moq: "20 units / style",
    leadTime: "35–50 days",
    featured: false,
    status: "PUBLISHED",
    images: images(0, "Private Label Starter Program"),
    specifications: [
      { label: "Program Type", value: "Private label, lower MOQ" },
      { label: "Design Support", value: "Included for first collection" },
      { label: "Branding", value: "Custom labels, tags, and packaging" },
    ],
    customizationOptions: [
      "Branded labeling and packaging",
      "Small-batch colorways",
      "Scaling path to full wholesale volumes",
    ],
    isSampleContent: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];
