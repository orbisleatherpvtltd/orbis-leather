import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSpecList } from "@/components/products/spec-list";
import { CustomizationList } from "@/components/products/customization-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { getProductBySlug } from "@/lib/products/data";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { productJsonLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/motion/reveal";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      description: "The product you're looking for could not be found.",
      path: `/products/${slug}`,
    });
  }

  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];

  return buildMetadata({
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription ?? product.name,
    path: `/products/${product.slug}`,
    image: primaryImage?.url ? { url: primaryImage.url, alt: primaryImage.altText } : undefined,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: product.category.name, href: `/products/${product.category.slug}` },
                { label: product.name },
              ]}
            />
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal direction="right">
              <ProductGallery images={product.images} productName={product.name} />
            </Reveal>

            <Reveal direction="left" delay={0.1} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
                  {product.category.name}
                </span>
                <h1 className="text-h1 font-bold text-ink">{product.name}</h1>
                <div className="flex flex-wrap gap-2">
                  {product.featured && (
                    <Badge variant="ink" className="w-fit">
                      Featured
                    </Badge>
                  )}
                  {product.isSampleContent && (
                    <Badge variant="leather" className="w-fit">
                      Sample Content
                    </Badge>
                  )}
                </div>
                {product.leatherType && (
                  <p className="text-caption uppercase tracking-wide text-ink/60">
                    {product.leatherType}
                  </p>
                )}
              </div>

              <p className="text-body-lg text-ink/80">{product.description}</p>

              <dl className="grid gap-4 sm:grid-cols-2">
                {product.moq && (
                  <div className="rounded-2xl bg-paper p-4 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
                    <dt className="text-caption uppercase tracking-wide text-ink/60">MOQ</dt>
                    <dd className="text-body text-ink">{product.moq}</dd>
                  </div>
                )}
                {product.leadTime && (
                  <div className="rounded-2xl bg-paper p-4 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
                    <dt className="text-caption uppercase tracking-wide text-ink/60">Lead Time</dt>
                    <dd className="text-body text-ink">{product.leadTime}</dd>
                  </div>
                )}
              </dl>

              <ButtonLink
                href={`${requestQuoteHref}?product=${product.slug}`}
                variant="reverse"
                className="w-fit"
              >
                Request Quote
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Section>

      {product.specifications.length > 0 && (
        <Section size="md" tone="stone">
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="text-h3 font-bold text-ink">Specifications</h2>
            </Reveal>
            <ProductSpecList specifications={product.specifications} />
          </div>
        </Section>
      )}

      {product.customizationOptions.length > 0 && (
        <Section size="md">
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="text-h3 font-bold text-ink">Customization Options</h2>
            </Reveal>
            <CustomizationList options={product.customizationOptions} />
          </div>
        </Section>
      )}

      <CtaBanner
        eyebrow="Ready to Move Forward?"
        title={`Request a quote for the ${product.name}`}
        description="Share your target volumes and specifications — our team will follow up with pricing and lead time."
        actions={
          <ButtonLink href={`${requestQuoteHref}?product=${product.slug}`} variant="reverse">
            Request Quote
          </ButtonLink>
        }
        className="my-8 md:my-12"
      />
    </>
  );
}
