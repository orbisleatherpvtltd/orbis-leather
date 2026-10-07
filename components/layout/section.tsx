import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "@/components/layout/container";

const sizes = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-28 lg:py-32",
} as const;

const tones = {
  paper: "bg-paper text-ink",
  stone: "bg-stone-50 text-ink",
  ink: "bg-ink text-paper",
} as const;

export type SectionProps = {
  as?: ElementType;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  container?: boolean;
  containerWidth?: ContainerProps["width"];
  className?: string;
  children: ReactNode;
};

export function Section({
  as: Tag = "section",
  size = "md",
  tone = "paper",
  container = true,
  containerWidth = "default",
  className,
  children,
}: SectionProps) {
  return (
    <Tag className={cn(sizes[size], tones[tone], className)}>
      {container ? <Container width={containerWidth}>{children}</Container> : children}
    </Tag>
  );
}
