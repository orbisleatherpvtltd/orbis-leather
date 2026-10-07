import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  default: "max-w-(--container-page)",
  wide: "max-w-[96rem]",
} as const;

export type ContainerProps = {
  as?: ElementType;
  width?: keyof typeof widths;
  className?: string;
  children: ReactNode;
};

export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", widths[width], className)}>
      {children}
    </Tag>
  );
}
