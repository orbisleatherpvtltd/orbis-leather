import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { siteConfig, requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export const metadata: Metadata = buildMetadata({
  title: "Contact ORBIS | Leather Jacket Manufacturer in Karachi",
  description:
    "Contact ORBIS, a leather jacket manufacturer in Karachi, Pakistan. Send your design and quantity (from 5 pieces per style) for a quote.",
  path: "/contact",
  titleMode: "absolute",
});

export default function ContactPage() {
  return (
    <Section size="lg">
      <div className="flex flex-col gap-8">
        <Reveal>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        </Reveal>
        <Reveal delay={0.05}>
          <Badge variant="outline" className="w-fit">
            Get In Touch
          </Badge>
        </Reveal>
        <SectionHeader
          as="h1"
          eyebrow="Contact"
          title="Let's talk about your leather jacket order"
          description="Send us your design and quantity, or ask a quick question. Orders start from 5 pieces per style. Our team replies within 1 business day."
        />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <StaggerGroup className="flex flex-col gap-8">
          <StaggerItem className="flex flex-col gap-4 rounded-2xl bg-paper p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <p className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Contact Details
            </p>
            <dl className="flex flex-col gap-3 text-body text-ink/80">
              <div>
                <dt className="text-caption uppercase tracking-wide text-ink/60">Phone</dt>
                <dd>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="link-underline hover:text-leather">
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption uppercase tracking-wide text-ink/60">Email</dt>
                <dd>
                  <a href={`mailto:${siteConfig.contact.email}`} className="link-underline hover:text-leather">
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption uppercase tracking-wide text-ink/60">Address</dt>
                {siteConfig.contact.addressLines.map((line) => (
                  <dd key={line}>{line}</dd>
                ))}
              </div>
            </dl>
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-4 rounded-2xl bg-paper p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <p className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Prefer to Chat?
            </p>
            <p className="text-body text-ink/70">
              Message us directly on WhatsApp for a fast response to quick questions.
            </p>
            <ButtonLink
              href={siteConfig.whatsapp.href}
              target="_blank"
              rel="noreferrer noopener"
              variant="secondary"
              className="w-fit"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </ButtonLink>
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-4 rounded-2xl bg-paper p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <p className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Ready to Order?
            </p>
            <p className="text-body text-ink/70">
              For detailed specifications and quantities, use our dedicated quote request form.
            </p>
            <ButtonLink href={requestQuoteHref} variant="outline" className="w-fit">
              Request Quote
            </ButtonLink>
          </StaggerItem>
        </StaggerGroup>

        <Reveal direction="left" delay={0.1} className="rounded-2xl bg-paper p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5 md:p-10">
          <h2 className="text-h4 font-bold text-ink">Tell us about your project</h2>
          <p className="mt-2 text-body text-ink/70">
            The more you tell us, the faster we can quote. Fields marked * are required.
          </p>
          <InquiryForm variant="contact" className="mt-8" />
        </Reveal>
      </div>
    </Section>
  );
}
