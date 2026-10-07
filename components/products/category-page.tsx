import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductGrid } from "@/components/products/product-grid";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { getCategory, getProductsByCategory } from "@/lib/products/data";
import { requestQuoteHref } from "@/lib/site-config";
import type { ProductCategorySlug } from "@/lib/products/types";
import { Reveal } from "@/components/motion/reveal";

export async function CategoryPage({ slug }: { slug: ProductCategorySlug }) {
  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <>
      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: category.name },
              ]}
            />
          </Reveal>
          <SectionHeader
            as="h1"
            eyebrow="Wholesale & Private Label"
            title={category.name}
            description={category.description}
          />
        </div>
      </Section>

      <Section size="md" tone="stone">
        <ProductGrid products={products} />
      </Section>

      <CtaBanner
        eyebrow="Need Something Different?"
        title="Talk to us about a custom program"
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
