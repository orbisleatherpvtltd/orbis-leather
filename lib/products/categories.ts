import type { ProductCategory } from "@/lib/products/types";

export const productCategories: ProductCategory[] = [
  {
    slug: "mens-leather-jackets",
    name: "Men's Leather Jackets",
    description:
      "Genuine leather outerwear for men, available for wholesale and private-label production.",
  },
  {
    slug: "womens-leather-jackets",
    name: "Women's Leather Jackets",
    description:
      "Genuine leather outerwear for women, available for wholesale and private-label production.",
  },
  {
    slug: "custom-private-label",
    name: "Custom / Private Label",
    description:
      "OEM and private-label manufacturing programs built around your designs, branding, and specifications.",
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}
