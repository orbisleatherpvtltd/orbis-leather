import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...props },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer items-start gap-3 text-body text-ink"
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={cn("mt-0.5 h-4 w-4 accent-leather", className)}
        {...props}
      />
      {label}
    </label>
  );
});
