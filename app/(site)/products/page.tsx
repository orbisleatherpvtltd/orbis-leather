import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductGrid } from "@/components/products/product-grid";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { getCategories, getPublishedProducts } from "@/lib/products/data";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Genuine leather jackets and private-label programs for wholesale buyers. Browse our range and request a quote.",
  path: "/products",
});

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getPublishedProducts(), getCategories()]);

  return (
    <>
      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <Badge variant="outline" className="w-fit">
              Product Range
            </Badge>
          </Reveal>
          <SectionHeader
            as="h1"
            eyebrow="Wholesale & Private Label"
            title="Genuine leather jackets, built for your program"
            description="Browse our range of manufactured styles and custom programs. Pricing is confirmed per order — request a quote for any product."
          />
          <StaggerGroup className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <StaggerItem key={category.slug}>
                <Link href={`/products/${category.slug}`}>
                  <Badge variant="outline" className="transition-all duration-200 hover:scale-105 hover:border-ink">
                    {category.name}
                  </Badge>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      <Section size="md" tone="stone">
        <ProductGrid products={products} />
      </Section>

      <CtaBanner
        eyebrow="Don't See What You Need?"
        title="We build custom and private-label programs too"
        description="Share your designs, materials, and volumes — our team will follow up with a tailored quote."
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
