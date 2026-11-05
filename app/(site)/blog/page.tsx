import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Resources",
  description:
    "Articles and resources on leather materials, manufacturing, and care for wholesale buyers.",
  path: "/blog",
  noindex: true,
});

type BlogPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const { q, page } = await searchParams;
  const pageNumber = Number(page) > 0 ? Number(page) : 1;

  return <BlogListing q={q} page={pageNumber} basePath="/blog" />;
}
