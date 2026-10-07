import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/logo/logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { legalNav, primaryNav, requestQuoteHref, siteConfig } from "@/lib/site-config";

const socialIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rounded-t-[2.5rem] bg-ink text-paper">
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

      <Container className="py-16">
        <StaggerGroup className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <StaggerItem className="flex flex-col gap-4">
            <Logo layout="horizontal" tone="reverse" />
            <p className="max-w-xs text-body text-paper/70">{siteConfig.description}</p>
            <div className="flex gap-2 pt-2">
              {siteConfig.social.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-all duration-200 hover:scale-105 hover:border-paper hover:text-paper"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </StaggerItem>

          <StaggerItem>
            <h3 className="text-eyebrow font-medium uppercase tracking-[0.16em] text-paper/50">
              Navigate
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-body text-paper/80 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h3 className="text-eyebrow font-medium uppercase tracking-[0.16em] text-paper/50">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-body text-paper/80">
              <li>{siteConfig.contact.phone}</li>
              <li>{siteConfig.contact.email}</li>
              {siteConfig.contact.addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h3 className="text-eyebrow font-medium uppercase tracking-[0.16em] text-paper/50">
              Legal
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-body text-paper/80 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerGroup>
      </Container>

      <div className="border-t border-paper/10 py-6">
        <Container>
          <p className="text-caption text-paper/50">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
