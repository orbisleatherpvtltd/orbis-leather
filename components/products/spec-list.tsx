import type { ProductSpecification } from "@/lib/products/types";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function ProductSpecList({ specifications }: { specifications: ProductSpecification[] }) {
  if (specifications.length === 0) return null;

  return (
    <StaggerGroup className="grid gap-4 sm:grid-cols-2">
      {specifications.map((spec) => (
        <StaggerItem key={spec.label}>
          <div className="rounded-2xl bg-paper p-4 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <dt className="text-caption uppercase tracking-wide text-ink/60">{spec.label}</dt>
            <dd className="text-body text-ink">{spec.value}</dd>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
