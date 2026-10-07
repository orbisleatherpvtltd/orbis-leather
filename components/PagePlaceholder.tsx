import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Section size="lg">
      <div className="flex flex-col gap-8">
        <Reveal>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />
        </Reveal>
        <Reveal delay={0.05}>
          <Badge variant="outline" className="w-fit">
            Phase 1 Foundation
          </Badge>
        </Reveal>
        <SectionHeader
          as="h1"
          title={title}
          description={
            description ??
            "This route is part of the Phase 1 design-system foundation. Full page content arrives in a later phase."
          }
        />
      </div>
    </Section>
  );
}
