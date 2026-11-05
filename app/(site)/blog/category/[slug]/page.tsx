import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import { getBlogCategory } from "@/lib/blog/data";
import type { BlogCategorySlug } from "@/lib/blog/types";
import { buildMetadata } from "@/lib/seo/metadata";

type BlogCategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getBlogCategory(slug as BlogCategorySlug);

  if (!category) {
    return buildMetadata({
      title: "Category Not Found",
      description: "The blog category you're looking for could not be found.",
      path: `/blog/category/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${category.name} - Blog & Resources`,
    description: category.description || `Articles in ${category.name} for wholesale leather buyers.`,
    path: `/blog/category/${category.slug}`,
    noindex: true,
  });
}

export default async function BlogCategoryPage({ params, searchParams }: BlogCategoryPageProps) {
  const { slug } = await params;
  const { q, page } = await searchParams;
  const pageNumber = Number(page) > 0 ? Number(page) : 1;

  const category = await getBlogCategory(slug as BlogCategorySlug);
  if (!category) notFound();

  return (
    <BlogListing
      category={category.slug}
      q={q}
      page={pageNumber}
      basePath={`/blog/category/${category.slug}`}
      breadcrumbLabel={category.name}
    />
  );
}
