import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleContent } from "@/components/blog/article-content";
import { RelatedPosts } from "@/components/blog/related-posts";
import { BlogCTA } from "@/components/blog/blog-cta";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog/data";
import { siteUrl } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const ogImage = post.ogImage ?? post.heroImage;

  const base = buildMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    image: ogImage.url ? { url: ogImage.url, alt: ogImage.altText } : undefined,
    type: "article",
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: post.author },
    image: post.heroImage.url ? [new URL(post.heroImage.url, siteUrl).toString()] : undefined,
    mainEntityOfPage: new URL(`/blog/${post.slug}`, siteUrl).toString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </Reveal>
          <ArticleHeader post={post} />
        </div>
      </Section>

      <Section size="md">
        <div className="mx-auto max-w-3xl">
          <ArticleContent content={post.content} />
        </div>
      </Section>

      {relatedPosts.length > 0 && (
        <Section size="md" tone="stone">
          <RelatedPosts posts={relatedPosts} />
        </Section>
      )}

      <BlogCTA
        title={`Have a question about ${post.title}?`}
        description="Reach out and our team will follow up — or request a quote directly for your project."
        className="my-8 md:my-12"
      />
    </>
  );
}
