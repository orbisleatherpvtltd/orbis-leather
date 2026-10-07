"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

const springTransition: Transition = { type: "spring", stiffness: 140, damping: 20 };

type RevealDirection = "up" | "down" | "left" | "right" | "none";

const offsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
};

export type RevealProps = {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  amount?: number;
  once?: boolean;
  className?: string;
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  amount = 0.35,
  once = true,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction];

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ ...springTransition, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
