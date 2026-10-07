import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { requestQuoteHref } from "@/lib/site-config";

export function BlogCTA({
  eyebrow = "Ready to Start a Program?",
  title = "Talk to our team about your leather manufacturing project",
  description = "Share your specifications and volumes — our team will follow up with a tailored quote.",
  className = "my-8 md:my-12",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <CtaBanner
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={
        <ButtonLink href={requestQuoteHref} variant="reverse">
          Request Quote
        </ButtonLink>
      }
      className={className}
    />
  );
}
