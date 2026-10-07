import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { getProductBySlug } from "@/lib/products/data";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote",
  description:
    "Submit your product specifications and quantities for a tailored wholesale or private-label quote.",
  path: "/request-quote",
});

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productSlug } = await searchParams;
  const product = productSlug ? await getProductBySlug(productSlug) : null;

  return (
    <Section size="lg">
      <div className="flex flex-col gap-8">
        <Reveal>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]} />
        </Reveal>
        <Reveal delay={0.05}>
          <Badge variant="outline" className="w-fit">
            Wholesale Inquiries
          </Badge>
        </Reveal>
        <SectionHeader
          as="h1"
          eyebrow="Request a Quote"
          title="Tell us about your project"
          description="Share your specifications, quantities, and timeline. We reply within 24 hours."
        />
        {product && (
          <p className="text-body text-ink/70">
            Regarding:{" "}
            <Link href={`/products/${product.slug}`} className="font-medium text-ink link-underline">
              {product.name}
            </Link>
          </p>
        )}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Reveal direction="right" className="rounded-2xl bg-paper p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5 md:p-10">
          <InquiryForm
            variant="quote"
            defaultProductInterest={product?.category.name}
            defaultMessage={product ? `Regarding: ${product.name}\n\n` : undefined}
          />
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 rounded-2xl bg-stone-50 p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <p className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              What Happens Next
            </p>
            <p className="text-body text-ink/70">
              Our team reviews every inquiry personally. We reply within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-paper p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <p className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Prefer WhatsApp?
            </p>
            <p className="text-body text-ink/70">
              For a faster initial conversation, you can also reach us directly on WhatsApp.
            </p>
            <a
              href={siteConfig.whatsapp.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-fit items-center gap-2 text-body font-medium text-ink link-underline hover:text-leather"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
