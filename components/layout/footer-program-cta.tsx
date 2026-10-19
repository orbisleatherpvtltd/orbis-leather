"use client";

import { usePathname } from "next/navigation";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { requestQuoteHref } from "@/lib/site-config";

export function FooterProgramCta() {
  const pathname = usePathname();
  if (pathname === "/faq") return null;

  return (
    <div className="pt-14 md:pt-16">
      <CtaBanner
        tone="ink"
        eyebrow="Wholesale Inquiries"
        title="Start your leather program with ORBIS"
        description="Tell us about your specifications and volumes — our team will follow up with a tailored quote."
        actions={
          <ButtonLink href={requestQuoteHref} variant="reverse">
            Request Quote
          </ButtonLink>
        }
        className="!mx-auto bg-paper/[0.06] py-14 ring-1 ring-paper/10 md:py-16"
      />
    </div>
  );
}
