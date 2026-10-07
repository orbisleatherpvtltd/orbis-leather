import { CheckIcon } from "@/components/icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function CustomizationList({ options }: { options: string[] }) {
  if (options.length === 0) return null;

  return (
    <StaggerGroup className="flex flex-col gap-3">
      {options.map((option) => (
        <StaggerItem key={option} className="flex items-start gap-3 text-body text-ink/80">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leather/10">
            <CheckIcon className="h-3.5 w-3.5 text-leather" aria-hidden="true" />
          </span>
          <span>{option}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
