"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function DrawLine({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn("h-px w-full bg-leather/40", className)} />;
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={cn("h-px w-full origin-left bg-gradient-to-r from-leather via-leather/40 to-transparent", className)}
    />
  );
}
