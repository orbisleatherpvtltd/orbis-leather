"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";
import { requestQuoteHref } from "@/lib/site-config";

type ShowcaseCard = {
  src: string;
  alt: string;
  ring: string;
};

const cards: ShowcaseCard[] = [
  {
    src: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=600&q=80",
    alt: "Detail of genuine leather bag (placeholder)",
    ring: "ring-leather/40",
  },
  {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    alt: "Genuine leather jacket on display (placeholder)",
    ring: "ring-ink/20",
  },
  {
    src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    alt: "Leather jacket flat lay (placeholder)",
    ring: "ring-amber-700/40",
  },
  {
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    alt: "Pair of leather boots (placeholder)",
    ring: "ring-stone-400/50",
  },
  {
    src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=600&q=80",
    alt: "Genuine leather handbag (placeholder)",
    ring: "ring-leather/40",
  },
];

const chips = [
  {
    label: "Sample approved",
    className: "left-2 -top-4 bg-ink text-paper sm:left-6 sm:-top-6",
    dot: "bg-emerald-400",
  },
  {
    label: "Order shipped",
    className: "right-2 -bottom-4 bg-leather text-paper sm:right-6 sm:-bottom-6",
    dot: "bg-amber-300",
  },
];

// Natural arc curve configuration for 5 cards
const deckSpread = [
  { rotate: -12, y: 14, x: -16, zIndex: 10 },
  { rotate: -6, y: -4, x: -8, zIndex: 15 },
  { rotate: 0, y: -18, x: 0, zIndex: 20 },
  { rotate: 6, y: -4, x: 8, zIndex: 15 },
  { rotate: 12, y: 14, x: 16, zIndex: 10 },
];

export function ShowcaseSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <Section size="lg" tone="stone" className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Soft Atmospheric Leather Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-gradient-to-tr from-leather/15 via-amber-600/10 to-transparent blur-3xl lg:h-[480px] lg:w-[480px]"
      />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        {/* Left Column: Original Content & Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-6 text-left"
        >
          <Badge variant="outline">Why Manufacturers Choose Us</Badge>
          <h2 className="max-w-md text-h2 font-bold text-ink">
            Whether it&apos;s bags, jackets, or footwear —{" "}
            <span className="text-leather">we manufacture it right.</span>
          </h2>
          <p className="max-w-md text-body-lg text-ink/70">
            From pattern to finished product, our team handles wholesale and private-label
            programs of any scale, backed by decades of genuine leather craftsmanship.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href={requestQuoteHref} variant="primary" className="rounded-full px-8">
              Request Quote
            </ButtonLink>
            <TextLink href="/capabilities" withArrow tone="leather">
              View Capabilities
            </TextLink>
          </div>
        </motion.div>

        {/* Right Column: Next-Level Dynamic Card Deck */}
        <div className="relative mx-auto flex w-full max-w-lg items-center justify-center px-4 py-12 lg:mx-0 lg:max-w-none">
          <div className="relative flex items-center justify-center py-6">
            {cards.map((card, index) => {
              const base = deckSpread[index];
              const isHovered = hoveredIdx === index;

              // Dynamic accordion shift logic:
              // Other cards shift away when any single card is hovered
              let dynamicX = base.x;
              if (hoveredIdx !== null) {
                if (index < hoveredIdx) dynamicX = base.x - 22; // push left
                if (index > hoveredIdx) dynamicX = base.x + 22; // push right
              }

              return (
                <motion.div
                  key={card.src}
                  initial={{ opacity: 0, y: 35, rotate: base.rotate * 1.5, scale: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    y: base.y,
                    x: dynamicX,
                    rotate: base.rotate,
                    scale: 1,
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  animate={{
                    x: dynamicX,
                    y: isHovered ? base.y - 28 : base.y,
                    rotate: isHovered ? 0 : base.rotate,
                    scale: isHovered ? 1.16 : 1,
                    zIndex: isHovered ? 50 : base.zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                    mass: 0.7,
                  }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={cn(
                    "relative shrink-0 cursor-pointer select-none",
                    index !== 0 && "-ml-7 sm:-ml-10 md:-ml-12 lg:-ml-14",
                  )}
                >
                  <div
                    className={cn(
                      "group relative aspect-[3/4.2] w-24 overflow-hidden rounded-2xl bg-stone-100 shadow-[0_18px_36px_-8px_rgba(0,0,0,0.22)] ring-2 transition-shadow duration-300 sm:w-32 md:w-38 lg:w-44",
                      card.ring,
                    )}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 640px) 110px, (max-width: 1024px) 160px, 190px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />

                    {/* Specular gloss highlight overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Floating Luxury Status Badges */}
          {chips.map((chip, index) => (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              animate={{
                y: [0, index === 0 ? -4 : 4, 0],
              }}
              transition={{
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.8,
                },
                default: {
                  type: "spring",
                  stiffness: 180,
                  damping: 16,
                  delay: 0.6 + index * 0.2,
                },
              }}
              className={cn(
                "absolute z-40 flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold shadow-xl backdrop-blur-md",
                chip.className,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", chip.dot)} />
              {chip.label}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}