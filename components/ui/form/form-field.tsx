import type { ReactNode } from "react";
import { Label } from "@/components/ui/form/label";

export type FormFieldProps = {
  id: string;
  label: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  children: ReactNode;
};

export function FormField({ id, label, helperText, errorText, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-leather">*</span>}
      </Label>
      {children}
      {errorText ? (
        <p id={`${id}-error`} className="text-caption text-red-600">
          {errorText}
        </p>
      ) : helperText ? (
        <p className="text-caption text-ink/60">{helperText}</p>
      ) : null}
    </div>
  );
}
