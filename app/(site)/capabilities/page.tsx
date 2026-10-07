import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Card, CardBody, CardTitle, CardDescription } from "@/components/ui/card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { DrawLine } from "@/components/motion/draw-line";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { processSteps } from "@/lib/capabilities/data";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "Our manufacturing process and production capabilities — from genuine leather sourcing to OEM, private label, and shipping.",
  path: "/capabilities",
});

const coverage = [
  {
    title: "Genuine Leather Sourcing",
    description: "Sourcing of genuine leather hides suited to your product and quality tier.",
  },
  {
    title: "OEM Manufacturing",
    description: "Full production to your specifications, designs, and technical packs.",
  },
  {
    title: "Private Label",
    description: "End-to-end private label production, from development through packaging.",
  },
  {
    title: "Branding",
    description: "Branded labeling, embossing, and packaging options for your product line.",
  },
  {
    title: "Hardware",
    description: "Zippers, buttons, buckles, and other hardware sourced to your requirements.",
  },
  {
    title: "Linings",
    description: "A range of lining materials to suit different product tiers and climates.",
  },
  {
    title: "Sizing",
    description: "Custom size runs and grading to match your target market's sizing standards.",
  },
  {
    title: "Sampling",
    description: "Pre-production samples available to confirm fit, materials, and construction.",
  },
  {
    title: "Lead Time",
    description: "Lead times vary by order volume and customization — confirmed at quote stage.",
  },
  {
    title: "Shipping Options",
    description: "International freight options confirmed per order based on destination and volume.",
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Capabilities" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <Badge variant="outline" className="w-fit">
              Manufacturing Capabilities
            </Badge>
          </Reveal>
          <SectionHeader
            as="h1"
            eyebrow="How We Manufacture"
            title="From raw hide to finished, packaged product"
            description="A disciplined, six-stage production process supported by decades of genuine leather manufacturing experience."
          />
        </div>
      </Section>

      <Section size="md" tone="stone">
        <DrawLine className="mb-10" />
        <ProcessSteps steps={processSteps} />
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="Production Coverage"
          title="What we support, end to end"
          description="Beyond core production, our team covers the full scope of a wholesale or private-label leather program."
          className="mb-12"
        />
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coverage.map((item) => (
            <StaggerItem key={item.title}>
              <Card>
                <CardBody>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CtaBanner
        eyebrow="Start a Project"
        title="Have specifications ready?"
        description="Send us your product details, quantities, and timeline — we'll follow up with a tailored quote."
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
