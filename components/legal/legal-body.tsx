import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LegalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex w-full max-w-[720px] flex-col gap-10", className)}>
      {children}
    </div>
  );
}

export function LegalIntro({ children }: { children: ReactNode }) {
  return <p className="text-body-lg text-ink/80">{children}</p>;
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h4 font-bold text-ink">
        {number}. {title}
      </h2>
      <div className="flex flex-col gap-4 text-body-lg text-ink/80">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-2 pl-5 text-body-lg text-ink/80 marker:text-ink/40 list-disc">{children}</ul>;
}
