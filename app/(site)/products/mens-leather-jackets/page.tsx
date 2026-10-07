import type { Metadata } from "next";
import { CategoryPage } from "@/components/products/category-page";
import { getCategory } from "@/lib/products/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const category = await getCategory("mens-leather-jackets");

  return buildMetadata({
    title: category?.name ?? "Men's Leather Jackets",
    description:
      category?.description ??
      "Genuine leather jackets for men, manufactured for wholesale and private-label buyers.",
    path: "/products/mens-leather-jackets",
  });
}

export default function MensLeatherJacketsPage() {
  return <CategoryPage slug="mens-leather-jackets" />;
}
