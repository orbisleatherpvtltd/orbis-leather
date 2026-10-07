import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { ImageFrame } from "@/components/ui/image-frame";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { CertificationEmptyState } from "@/components/ui/certification-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { DrawLine } from "@/components/motion/draw-line";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { dummyImage } from "@/lib/dummy-images";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "25 years of leather manufacturing experience, based in Pakistan — the story behind ORBIS Signature Leather.",
  path: "/about",
});

const journey = [
  {
    label: "Foundations",
    description:
      "ORBIS began as a small workshop built on craftsmanship fundamentals: hand-selected leather, careful cutting, and disciplined stitching.",
  },
  {
    label: "Capability Building",
    description:
      "Over time, we invested in equipment, training, and process controls to expand production capacity while holding to consistent quality standards.",
  },
  {
    label: "International Reach",
    description:
      "Our team went on to support wholesale and private-label partners across international markets. Partner details are shared only with verified inquiries.",
  },
  {
    label: "Today",
    description:
      "25 years on, ORBIS combines traditional leather craftsmanship with modern production and quality-control standards, based in Pakistan.",
  },
];

const galleryPlaceholders = [
  "Cutting floor",
  "Stitching line",
  "Quality control station",
  "Packaging & dispatch",
];

export default function AboutPage() {
  return (
    <>
      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <Badge variant="outline" className="w-fit">
              25 Years of Manufacturing Experience
            </Badge>
          </Reveal>
          <SectionHeader
            as="h1"
            eyebrow="About ORBIS"
            title="Signature leather craftsmanship, built over 25 years"
            description="ORBIS Signature Leather is a Pakistan-based manufacturer specializing in genuine leather apparel and accessories for global wholesale and private-label partners."
          />
        </div>
      </Section>

      <Section size="md" tone="stone">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal direction="right" className="flex flex-col gap-5">
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Our Story
            </span>
            <h2 className="text-h2 font-bold text-ink">
              Two and a half decades of dependable production
            </h2>
            <p className="text-body-lg text-ink/70">
              With 25 years of manufacturing experience, our team has developed deep expertise
              across cutting, stitching, quality control, and export documentation — refined
              through decades of production for international markets.
            </p>
            <p className="text-body-lg text-ink/70">
              Our production facility is based in Pakistan, a region long recognized for skilled
              leather craftsmanship and access to quality raw hides. This gives us the technical
              foundation to support both small private-label runs and larger wholesale programs.
            </p>
            <p className="text-caption text-ink/60">
              Note: specific partner and brand relationships are treated as confidential and are
              shared only with verified business inquiries.
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <ImageFrame
              src={dummyImage(0, 1200)}
              alt="ORBIS manufacturing facility (placeholder)"
              ratio="portrait"
              className="rounded-3xl shadow-2xl shadow-ink/10"
            />
          </Reveal>
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="Manufacturing Journey"
          title="How we got here"
          description="A conservative overview of our growth — from a small workshop to a full-scale manufacturing operation."
          className="mb-12"
        />
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, index) => (
            <StaggerItem key={step.label}>
              <div className="flex h-full flex-col gap-3 rounded-2xl bg-paper p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-leather/15">
                <DrawLine className="w-10" />
                <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h4 font-bold text-ink">{step.label}</h3>
                <p className="text-body text-ink/70">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section size="md" tone="stone">
        <SectionHeader
          eyebrow="Inside ORBIS"
          title="Factory & production gallery"
          description="A look at our manufacturing floor. Placeholder photography shown below pending final gallery assets."
          className="mb-12"
        />
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryPlaceholders.map((caption, index) => (
            <StaggerItem key={caption} className="flex flex-col gap-3">
              <ImageFrame
                src={dummyImage(index + 1, 800)}
                alt={`${caption} (placeholder)`}
                ratio="square"
                className="rounded-2xl shadow-lg shadow-ink/5"
              />
              <p className="text-caption text-ink/60">{caption}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="Certifications"
          title="Certifications & compliance"
          description="Verified certifications will be published here as they are confirmed."
          className="mb-8"
        />
        <Reveal>
          <CertificationEmptyState />
        </Reveal>
      </Section>

      <CtaBanner
        eyebrow="Work With Us"
        title="See how we can support your leather program"
        description="Explore our manufacturing capabilities or send us your project details to start a conversation."
        actions={
          <>
            <ButtonLink href="/capabilities" variant="reverse">
              View Capabilities
            </ButtonLink>
            <ButtonLink href={requestQuoteHref} variant="outline-reverse">
              Request Quote
            </ButtonLink>
          </>
        }
        className="my-8 md:my-12"
      />
    </>
  );
}
