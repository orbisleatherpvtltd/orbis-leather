import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("stagger-group", className)}>{children}</div>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("stagger-item", className)}>{children}</div>;
}
