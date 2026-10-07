import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-lg shadow-ink/5 ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-leather/15",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-1 flex-col gap-3 p-6 md:p-8", className)} {...props} />;
}

export function CardEyebrow({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-eyebrow font-medium uppercase tracking-[0.16em] text-leather",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-h4 font-bold text-ink", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body text-ink/70", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto flex items-center gap-2 pt-2", className)} {...props} />
  );
}
