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
import { TextLink } from "@/components/ui/text-link";
import { ProcessSteps } from "@/components/ui/process-steps";
import { CtaBanner } from "@/components/ui/cta-banner";
import { getCategories, getPublishedProducts } from "@/lib/products/data";
import { productCategories } from "@/lib/products/categories";
import { processSteps } from "@/lib/capabilities/data";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Leather Jacket Manufacturer Pakistan | MOQ 5 Pieces | ORBIS",
  description:
    "Leather jacket manufacturer in Karachi, since 2001. Private label and custom embroidery jackets from 5 pieces per style. Request a quote.",
  path: "/",
  titleMode: "absolute",
});

const homepageShopSlugs = [
  "custom-embroidery-jacket",
  "cafe-racer-jacket",
  "classic-biker-jacket",
  "fitted-moto-jacket",
];

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getPublishedProducts().catch(() => []),
    getCategories().catch(() => productCategories),
  ]);

  const shopProducts = homepageShopSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug);
    return product ? [product] : [];
  });
  const aviatorBomber = products.find((product) => product.slug === "aviator-bomber-jacket") ?? null;

  return (
    <>
      <HeroSplit categories={categories} />

      <BrowseShopSection products={shopProducts} categories={categories} />

      <Section size="md">
        <CollectionsPromoRow />
      </Section>

      <CompleteTheProgram products={products.slice(0, 3)} />

      <LifestyleBanner product={aviatorBomber} />

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

      <CtaBanner
        eyebrow="Start a Project"
        title="Have specifications ready?"
        description="Send us your product details, quantities, and timeline. We'll follow up with a tailored quote."
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
