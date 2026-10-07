"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ImageFrame } from "@/components/ui/image-frame";

export function SpecialProgramCard({
  href,
  image,
  alt,
  name,
  category,
}: {
  href: string;
  image?: string;
  alt: string;
  name: string;
  category: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Link href={href} className="group relative flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden rounded-2xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-3 h-full rounded-2xl bg-leather/15 shadow-lg shadow-ink/5"
          style={{ transform: "rotate(-4deg)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-3 top-1.5 h-full rounded-2xl bg-stone-200/70 shadow-lg shadow-ink/5"
          style={{ transform: "rotate(2deg)" }}
        />

        <motion.div
          whileHover={reduceMotion ? undefined : { y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-xl shadow-ink/10 ring-1 ring-ink/5"
        >
          <span className="absolute left-4 top-4 z-10">
            <Badge variant="leather">Custom Programs</Badge>
          </span>

          <ImageFrame
            src={image}
            alt={alt}
            sizes="(min-width: 1024px) 25vw, 60vw"
            className="aspect-auto min-h-[220px] flex-1"
          />

          <div className="flex flex-col gap-1 p-5">
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Build Your Program
            </span>
            <span className="text-body font-semibold text-ink">{name}</span>
            <span className="text-caption text-ink/50">{category}</span>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
