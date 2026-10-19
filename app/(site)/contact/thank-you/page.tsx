import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { LeadEvent } from "@/components/analytics/lead-event";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Thank you - ORBIS Leather",
  description: "ORBIS has received your inquiry.",
  path: "/contact/thank-you",
  titleMode: "absolute",
  noindex: true,
});

export default function ContactThankYouPage() {
  return (
    <Section size="lg">
      <LeadEvent />
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
        <h1 className="text-h2 font-bold text-ink">Thank you.</h1>
        <p className="text-body-lg text-ink/80">
          We have received your inquiry and will reply within 1 business day. For urgent questions, message us on WhatsApp.
        </p>
        <ButtonLink href={siteConfig.whatsapp.href} target="_blank" rel="noreferrer noopener" variant="secondary">
          <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
          Chat on WhatsApp
        </ButtonLink>
      </div>
    </Section>
  );
}
