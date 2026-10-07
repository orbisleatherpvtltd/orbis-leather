import type { Metadata } from "next";
import { CategoryPage } from "@/components/products/category-page";
import { getCategory } from "@/lib/products/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const category = await getCategory("custom-private-label");

  return buildMetadata({
    title: category?.name ?? "Custom / Private Label",
    description:
      category?.description ??
      "Custom and private-label leather jacket production for wholesale buyers.",
    path: "/products/custom-private-label",
  });
}

export default function CustomPrivateLabelPage() {
  return <CategoryPage slug="custom-private-label" />;
}
