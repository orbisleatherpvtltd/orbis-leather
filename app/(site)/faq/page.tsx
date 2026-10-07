import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { getPublishedFaqs } from "@/lib/faq/data";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about MOQ, sampling, lead time, shipping, Incoterms, and payment terms.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqEntries = await getPublishedFaqs();

  return (
    <>
      {faqEntries.length > 0 && <JsonLd data={faqPageJsonLd(faqEntries)} />}

      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <Badge variant="outline" className="w-fit">
              Frequently Asked Questions
            </Badge>
          </Reveal>
          <SectionHeader
            as="h1"
            eyebrow="Before You Reach Out"
            title="Common questions about working with us"
            description="Exact terms are confirmed per order — the answers below are general guidance. For specifics, send us your project details."
          />
        </div>
      </Section>

      <Section size="md" tone="stone">
        <Accordion
          items={faqEntries.map((entry) => ({
            id: entry.id,
            question: entry.question,
            answer: entry.answer,
          }))}
        />
      </Section>

      <CtaBanner
        eyebrow="Still Have Questions?"
        title="Tell us about your project"
        description="Send your requirements through Request Quote and we'll confirm the details that matter for your order."
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
