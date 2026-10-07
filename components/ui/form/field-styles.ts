import { cn } from "@/lib/utils";

export function fieldClasses(invalid?: boolean, className?: string) {
  return cn(
    "w-full border bg-paper px-4 py-3 text-body text-ink placeholder:text-ink/40 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leather disabled:cursor-not-allowed disabled:opacity-50",
    invalid ? "border-red-600" : "border-stone-300 hover:border-ink/40",
    className,
  );
}
