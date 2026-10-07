import { forwardRef, type InputHTMLAttributes } from "react";
import { fieldClasses } from "@/components/ui/form/field-styles";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...props },
  ref,
) {
  return <input ref={ref} className={fieldClasses(invalid, className)} {...props} />;
});
