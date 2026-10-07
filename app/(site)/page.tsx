import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { HeroSplit } from "@/components/home/hero-split";
import { ShowcaseSection } from "@/components/home/showcase-section";
import { BrowseShopSection } from "@/components/home/browse-shop-section";
import { CollectionsPromoRow } from "@/components/home/collections-promo-row";
import { CompleteTheProgram } from "@/components/home/complete-the-program";
import { LifestyleBanner } from "@/components/home/lifestyle-banner";
import { RelatedCarousel } from "@/components/home/related-carousel";
import { TextLink } from "@/components/ui/text-link";
import { ProcessSteps } from "@/components/ui/process-steps";
import { CertificationEmptyState } from "@/components/ui/certification-card";
import { BlogCard } from "@/components/blog/blog-card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { getCategories, getPublishedProducts } from "@/lib/products/data";
import { productCategories } from "@/lib/products/categories";
import { getFeaturedPost } from "@/lib/blog/data";
import { processSteps } from "@/lib/capabilities/data";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "ORBIS Signature Leather",
  description:
    "ORBIS Signature Leather — premium B2B wholesale leather manufacturing and private label production, based in Pakistan.",
  path: "/",
  titleMode: "absolute",
});

export default async function HomePage() {
  const [products, categories, featuredPost] = await Promise.all([
    getPublishedProducts().catch(() => []),
    getCategories().catch(() => productCategories),
    getFeaturedPost().catch(() => null),
  ]);

  const aviatorBomber = products.find((product) => product.slug === "aviator-bomber-jacket") ?? null;

  return (
    <>
      <HeroSplit categories={categories} />

      <BrowseShopSection products={products.slice(0, 5)} categories={categories} />

      <Section size="md">
        <CollectionsPromoRow />
      </Section>

      <CompleteTheProgram products={products.slice(0, 3)} />

      <LifestyleBanner product={aviatorBomber} />

      <Section size="md" tone="stone">
        <RelatedCarousel products={products} />
      </Section>

      <ShowcaseSection />

      <Section size="md">
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="How We Manufacture"
            title="From raw hide to finished, packaged product"
            description="A disciplined, six-stage production process supported by decades of genuine leather manufacturing experience."
          />
          <ProcessSteps steps={processSteps.slice(0, 3)} className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" />
          <Reveal>
            <TextLink href="/capabilities" withArrow tone="leather" className="w-fit">
              View Full Process
            </TextLink>
          </Reveal>
        </div>
      </Section>

      <Section size="md" tone="stone">
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="Quality & Compliance"
            title="Certifications & compliance status"
            description="We only list certifications once verified. Nothing is published here until confirmed."
          />
          <Reveal>
            <CertificationEmptyState />
          </Reveal>
          <Reveal delay={0.1}>
            <TextLink href="/quality-compliance" withArrow tone="leather" className="w-fit">
              View Quality & Compliance
            </TextLink>
          </Reveal>
        </div>
      </Section>

      {featuredPost && (
        <Section size="md">
          <div className="flex flex-col gap-8">
            <SectionHeader eyebrow="Blog & Resources" title="From the Blog" />
            <Reveal className="max-w-md">
              <BlogCard post={featuredPost} />
            </Reveal>
            <Reveal delay={0.1}>
              <TextLink href="/blog" withArrow tone="leather" className="w-fit">
                Visit the Blog
              </TextLink>
            </Reveal>
          </div>
        </Section>
      )}

      <CtaBanner
        eyebrow="Start a Project"
        title="Have specifications ready?"
        description="Send us your product details, quantities, and timeline — we'll follow up with a tailored quote."
        actions={
          <ButtonLink href={requestQuoteHref} variant="reverse">
            Request Quote
          </ButtonLink>
        }
        className="my-8 md:my-12"
      />
    </>
  );
}
