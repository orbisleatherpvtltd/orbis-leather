import type { Metadata } from "next";
import { CategoryPage } from "@/components/products/category-page";
import { getCategory } from "@/lib/products/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const category = await getCategory("womens-leather-jackets");

  return buildMetadata({
    title: category?.name ?? "Women's Leather Jackets",
    description:
      category?.description ??
      "Genuine leather jackets for women, manufactured for wholesale and private-label buyers.",
    path: "/products/womens-leather-jackets",
  });
}

export default function WomensLeatherJacketsPage() {
  return <CategoryPage slug="womens-leather-jackets" />;
}
