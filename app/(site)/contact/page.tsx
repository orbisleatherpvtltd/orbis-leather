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
  title: "Contact",
  description: "Get in touch with ORBIS Signature Leather for wholesale and private-label inquiries.",
  path: "/contact",
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
          title="Let's talk about your leather program"
          description="Reach out directly, or send a message below — our team replies within 24 hours."
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
                <dd>{siteConfig.contact.phone}</dd>
              </div>
              <div>
                <dt className="text-caption uppercase tracking-wide text-ink/60">Email</dt>
                <dd>{siteConfig.contact.email}</dd>
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
          <h2 className="text-h4 font-bold text-ink">Send a Message</h2>
          <p className="mt-2 text-body text-ink/70">
            Tell us a bit about your inquiry and we&apos;ll get back to you.
          </p>
          <InquiryForm variant="contact" className="mt-8" />
        </Reveal>
      </div>
    </Section>
  );
}
