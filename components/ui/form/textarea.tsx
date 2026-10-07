import { forwardRef, type TextareaHTMLAttributes } from "react";
import { fieldClasses } from "@/components/ui/form/field-styles";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, rows = 5, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={fieldClasses(invalid, className)}
      {...props}
    />
  );
});
