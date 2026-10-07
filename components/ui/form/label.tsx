import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-caption font-medium uppercase tracking-wide text-ink/80", className)}
      {...props}
    />
  );
}
