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
  title: "Leather Jackets: Men's, Women's, Custom Embroidery | ORBIS Leather",
  titleMode: "absolute",
  description:
    "Browse men's and women's leather jacket styles, private label and custom embroidery jackets. MOQ 5 pieces per style. Made in Karachi, Pakistan.",
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
            eyebrow="From 5 Pieces Per Style"
            title="Genuine leather jackets, made for your brand"
            description="Browse our jacket styles, or send us your own design. Every style starts at 5 pieces. Pricing is confirmed in your quote, so request one for any jacket you like."
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
        title="We can make your own design too"
        description="Send us your design, reference photos and quantity. Orders start from 5 pieces per style. Our team will follow up with a quote."
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
