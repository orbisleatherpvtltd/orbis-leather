import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

const directionClass: Record<RevealDirection, string> = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  none: "",
};

export type RevealProps = {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
};

export function Reveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div className={cn(directionClass[direction], className)} style={style}>
      {children}
    </div>
  );
}
