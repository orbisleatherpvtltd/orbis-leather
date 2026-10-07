import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "reverse";
  actions?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
  actions,
  className,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          "text-h2 font-bold",
          tone === "reverse" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-body-lg",
            tone === "reverse" ? "text-paper/75" : "text-ink/70",
          )}
        >
          {description}
        </p>
      )}
      {actions && <div className="mt-2 flex flex-wrap gap-4">{actions}</div>}
    </Reveal>
  );
}
