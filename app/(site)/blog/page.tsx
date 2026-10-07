import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { ImageFrame } from "@/components/ui/image-frame";
import { Input } from "@/components/ui/form/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { CategoryBadge } from "@/components/blog/category-badge";
import { BlogCTA } from "@/components/blog/blog-cta";
import { getBlogCategories, getFeaturedPost, listPosts } from "@/lib/blog/data";
import { formatBlogDate } from "@/lib/blog/format";
import type { BlogCategorySlug } from "@/lib/blog/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Resources",
  description:
    "Articles and resources on leather materials, manufacturing, and care for wholesale buyers.",
  path: "/blog",
});

type BlogPageProps = {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const { category, q, page } = await searchParams;
  const pageNumber = Number(page) > 0 ? Number(page) : 1;

  const [categories, featuredPost, listResult] = await Promise.all([
    getBlogCategories(),
    getFeaturedPost(),
    listPosts({
      page: pageNumber,
      category: category as BlogCategorySlug | undefined,
      query: q,
    }),
  ]);

  const { posts, page: currentPage, totalPages } = listResult;

  const showFeatured = !category && !q && currentPage === 1;
  const gridPosts = showFeatured ? posts.filter((post) => post.id !== featuredPost?.id) : posts;

  const buildPageHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <>
      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <Badge variant="outline" className="w-fit">
              Blog & Resources
            </Badge>
          </Reveal>
          <SectionHeader
            as="h1"
            eyebrow="Blog & Resources"
            title="Leather manufacturing knowledge for wholesale buyers"
            description="Articles on materials, sourcing, and care — written for teams evaluating a wholesale or private-label program."
          />

          <StaggerGroup className="flex flex-wrap gap-3">
            <StaggerItem>
              <Link href="/blog">
                <Badge variant={!category ? "ink" : "outline"} className="w-fit transition-all duration-200 hover:scale-105">
                  All
                </Badge>
              </Link>
            </StaggerItem>
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link href={`/blog?category=${cat.slug}`}>
                  <Badge
                    variant={category === cat.slug ? "ink" : "outline"}
                    className="w-fit transition-all duration-200 hover:scale-105 hover:border-ink"
                  >
                    {cat.name}
                  </Badge>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <form action="/blog" method="GET" className="flex flex-wrap items-end gap-4">
              <div className="min-w-[240px] flex-1">
                <label
                  htmlFor="q"
                  className="mb-2 block text-caption uppercase tracking-wide text-ink/60"
                >
                  Search Articles
                </label>
                <Input id="q" name="q" type="search" defaultValue={q ?? ""} placeholder="Search by keyword" />
              </div>
              {category && <input type="hidden" name="category" value={category} />}
              <Button type="submit" variant="outline">
                Search
              </Button>
            </form>
          </Reveal>
        </div>
      </Section>

      {showFeatured && featuredPost && (
        <Section size="md" tone="stone">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
                Featured Article
              </span>
            </Reveal>
            <div className="grid gap-8 lg:grid-cols-2">
              <Reveal direction="right">
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <ImageFrame
                    src={featuredPost.heroImage.url}
                    alt={featuredPost.heroImage.altText}
                    ratio="wide"
                    priority
                    className="rounded-3xl shadow-2xl shadow-ink/10"
                  />
                </Link>
              </Reveal>
              <Reveal direction="left" delay={0.1} className="flex flex-col justify-center gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={featuredPost.category} />
                  {featuredPost.isSampleContent && <Badge variant="leather">Sample Content</Badge>}
                </div>
                <h2 className="text-h2 font-bold text-ink">
                  <Link href={`/blog/${featuredPost.slug}`} className="link-underline">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-caption uppercase tracking-wide text-ink/60">
                  {formatBlogDate(featuredPost.publishedAt)} · {featuredPost.author}
                </p>
                <p className="text-body-lg text-ink/70">{featuredPost.excerpt}</p>
                <ButtonLink href={`/blog/${featuredPost.slug}`} variant="primary" className="w-fit">
                  Read Article
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Section>
      )}

      <Section size="md" tone={showFeatured ? "paper" : "stone"}>
        <div className="flex flex-col gap-8">
          <h2 className="sr-only">Articles</h2>
          {gridPosts.length > 0 ? (
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <p className="text-body text-ink/60">
              No articles match your search yet. Try a different keyword or category.
            </p>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-between gap-4 pt-4">
              {currentPage > 1 ? (
                <ButtonLink href={buildPageHref(currentPage - 1)} variant="outline" size="sm">
                  Previous
                </ButtonLink>
              ) : (
                <span />
              )}
              <span className="text-caption text-ink/60">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages ? (
                <ButtonLink href={buildPageHref(currentPage + 1)} variant="outline" size="sm">
                  Next
                </ButtonLink>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </Section>

      <BlogCTA />
    </>
  );
}
