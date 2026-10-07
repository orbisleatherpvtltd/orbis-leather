import { ArrowRightIcon } from "@/components/icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  description?: string;
};

export function ProcessSteps({
  steps,
  className,
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  return (
    <StaggerGroup
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
        className,
      )}
    >
      {steps.map((step, index) => (
        <StaggerItem key={step.title} className="relative">
          <div className="flex h-full flex-col gap-3 rounded-2xl bg-paper p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-leather/15">
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Step {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h4 font-bold text-ink">{step.title}</h3>
            {step.description && (
              <p className="text-body text-ink/70">{step.description}</p>
            )}
          </div>
          {index < steps.length - 1 && (
            <ArrowRightIcon
              aria-hidden="true"
              className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-leather xl:block"
            />
          )}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
