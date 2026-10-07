import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export type CtaBannerProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  tone?: "ink" | "stone";
  className?: string;
};

export function CtaBanner({
  eyebrow,
  title,
  description,
  actions,
  tone = "ink",
  className,
}: CtaBannerProps) {
  return (
    <div
      className={cn(
        "mx-4 max-w-(--container-page) rounded-3xl py-16 sm:mx-6 md:py-20 lg:mx-auto",
        tone === "ink" ? "bg-ink text-paper" : "bg-stone-50 text-ink",
        className,
      )}
    >
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-3">
            {eyebrow && (
              <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
                {eyebrow}
              </span>
            )}
            <h2 className="text-h3 font-bold">{title}</h2>
            {description && (
              <p className={cn("max-w-xl text-body-lg", tone === "ink" ? "text-paper/75" : "text-ink/70")}>
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-4">{actions}</div>}
        </Reveal>
      </Container>
    </div>
  );
}
