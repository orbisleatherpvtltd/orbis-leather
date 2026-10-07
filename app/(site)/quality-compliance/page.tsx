import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardBody, CardTitle, CardDescription } from "@/components/ui/card";
import { CertificationEmptyState } from "@/components/ui/certification-card";
import { CheckIcon } from "@/components/icons";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { requestQuoteHref } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export const metadata: Metadata = buildMetadata({
  title: "Quality & Compliance",
  description:
    "Our quality standards, QC process, and export documentation for wholesale and private-label leather production.",
  path: "/quality-compliance",
});

const qualityStandards = [
  "Material inspection prior to cutting, checking hide quality and consistency.",
  "Stitching and construction checks against agreed specifications and samples.",
  "Hardware and component checks for durability and fit.",
  "Final visual inspection before packaging.",
];

const qcStages = [
  {
    title: "Incoming Inspection",
    description: "Raw materials and components are checked on arrival before entering production.",
  },
  {
    title: "In-Line Inspection",
    description: "Quality checks are carried out at key stages throughout cutting, stitching, and assembly.",
  },
  {
    title: "Final Inspection",
    description: "A final pre-packing inspection is carried out before goods are prepared for shipment.",
  },
];

const exportDocs = [
  "Commercial invoice and packing list",
  "Certificate of origin (on request, where applicable)",
  "Shipping and logistics coordination support",
  "Additional documentation available on request, depending on destination requirements",
];

export default function QualityCompliancePage() {
  return (
    <>
      <Section size="lg">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Quality & Compliance" }]}
            />
          </Reveal>
          <Reveal delay={0.05}>
            <Badge variant="outline" className="w-fit">
              Quality & Compliance
            </Badge>
          </Reveal>
          <SectionHeader
            as="h1"
            eyebrow="How We Ensure Quality"
            title="Consistent quality, from material to shipment"
            description="Our quality control process is applied across every order, regardless of volume."
          />
        </div>
      </Section>

      <Section size="md" tone="stone">
        <SectionHeader
          eyebrow="Quality Standards"
          title="What we check for"
          className="mb-10"
        />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2">
          {qualityStandards.map((item) => (
            <StaggerItem
              key={item}
              className="flex items-start gap-3 rounded-2xl bg-paper p-5 shadow-lg shadow-ink/5 ring-1 ring-ink/5"
            >
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-leather" aria-hidden="true" />
              <span className="text-body text-ink/80">{item}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="QC Process"
          title="Three stages of inspection"
          className="mb-10"
        />
        <StaggerGroup className="grid gap-6 sm:grid-cols-3">
          {qcStages.map((stage, index) => (
            <StaggerItem key={stage.title}>
              <Card>
                <CardBody>
                  <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CardTitle>{stage.title}</CardTitle>
                  <CardDescription>{stage.description}</CardDescription>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section size="md" tone="stone">
        <SectionHeader
          eyebrow="Export Documentation"
          title="Documentation support for international orders"
          description="Exact documentation depends on destination country and order requirements."
          className="mb-10"
        />
        <StaggerGroup className="flex flex-col gap-3">
          {exportDocs.map((doc) => (
            <StaggerItem key={doc} className="flex items-start gap-3 text-body text-ink/80">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-leather" aria-hidden="true" />
              <span>{doc}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="Certifications"
          title="Certifications & compliance status"
          description="We only list certifications once verified. Nothing is published here until confirmed."
          className="mb-8"
        />
        <Reveal>
          <CertificationEmptyState />
        </Reveal>
      </Section>

      <CtaBanner
        eyebrow="Questions on Compliance?"
        title="Ask us about your specific requirements"
        description="Share your destination market and compliance needs — we'll confirm what applies to your order."
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
