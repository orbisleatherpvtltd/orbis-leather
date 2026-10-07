import type { ReactNode } from "react";
import { AlertIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  footer?: ReactNode;
};

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again, or return to the homepage.",
  action,
  footer,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-5 py-24 text-center">
      <AlertIcon className="h-10 w-10 text-leather" />
      <div className="flex flex-col gap-2">
        <h1 className="text-h3 font-bold text-ink">{title}</h1>
        <p className="mx-auto max-w-md text-body text-ink/70">{description}</p>
      </div>
      {action && (
        <Button variant="primary" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
      {footer}
    </div>
  );
}
