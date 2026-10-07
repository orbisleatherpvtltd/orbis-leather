import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "outline" | "ink" | "leather" | "reverse";

const variants: Record<BadgeVariant, string> = {
  outline: "border border-ink/20 text-ink",
  ink: "bg-ink text-paper",
  leather: "bg-leather text-paper",
  reverse: "border border-paper/30 text-paper",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ variant = "outline", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-eyebrow font-medium uppercase tracking-[0.16em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
