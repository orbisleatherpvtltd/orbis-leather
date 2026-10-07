"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { ArrowRightIcon, ChevronRightIcon } from "@/components/icons";
import { lifestyleImage } from "@/lib/dummy-images";
import { requestQuoteHref } from "@/lib/site-config";
import type { ProductCategory } from "@/lib/products/types";
import { cn } from "@/lib/utils";

// Editorial slides with interactive craftsmanship hotspots
const slides = [
  {
    image: lifestyleImage(0, 1600),
    title: "The Signature Biker Program",
    category: "Outerwear & Jackets",
    stat: "1.2mm Drum-Dyed Cowhide",
    hotspots: [
      {
        x: "48%",
        y: "28%",
        label: "Italian Lapel Collar",
        spec: "Hand-creased 1.2mm drum-dyed hide with reinforced canvas interlining.",
      },
      {
        x: "62%",
        y: "48%",
        label: "Bespoke Hardware",
        spec: "YKK #10 cast antique brass zippers with custom engraved pullers.",
      },
      {
        x: "38%",
        y: "72%",
        label: "Bonded Twin Stitch",
        spec: "8 SPI heavy-duty bonded nylon thread engineered for maximum tensile load.",
      },
    ],
  },
  {
    image: lifestyleImage(1, 1600),
    title: "The Heritage Aviator",
    category: "Private Label Collection",
    stat: "Vegetable Tanned Leather",
    hotspots: [
      {
        x: "52%",
        y: "22%",
        label: "Genuine Shearling Trim",
        spec: "100% Australian Merino wool insulation with weatherproof edge coating.",
      },
      {
        x: "42%",
        y: "55%",
        label: "Artisan Waxed Finish",
        spec: "Hand-applied carnauba wax offering rich pull-up patina over decades.",
      },
      {
        x: "65%",
        y: "78%",
        label: "Reinforced Seams",
        spec: "Double-reinforced stress points with hand-tapped leather backing strips.",
      },
    ],
  },
];

export function HeroSplit({ categories }: { categories: ProductCategory[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // 3D Mouse Parallax Controls
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 25,
    stiffness: 180,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    damping: 25,
    stiffness: 180,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setActiveHotspot(null);
  };

  const current = slides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-6 sm:pb-24 sm:pt-8">
      {/* Background Ambient Luxury Light Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-amber-600/15 via-leather/10 to-transparent blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[650px] w-[650px] rounded-full bg-gradient-to-bl from-orange-500/10 via-amber-700/5 to-transparent blur-[150px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Capsule Bar */}
        <div className="mb-8 flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Specialized Units:
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group relative rounded-full border border-stone-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-ink/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-leather hover:bg-leather hover:text-paper"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-ink/60 lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Atelier Floor: Accepting Wholesale Production Runs
          </div>
        </div>

        {/* Master Hero Stage */}
        <div className="relative rounded-[2.5rem] border border-stone-200/90 bg-gradient-to-b from-stone-50 via-stone-100/60 to-stone-200/50 p-6 shadow-[0_30px_70px_-20px_rgba(28,25,23,0.14)] sm:p-10 lg:p-16">
          {/* Subtle Atelier Grid Lines & Watermark */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"
            aria-hidden="true"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[22vw] font-black uppercase tracking-tighter text-ink/[0.025] lg:text-[14vw]"
          >
            HAUTE TANNERY
          </span>

          <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: High-Fashion Copy & Interactive Selector */}
            <div className="flex flex-col items-start gap-8 lg:col-span-5">
              {/* Luxury Atelier Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-leather/30 bg-leather/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-leather">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leather opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-leather" />
                </span>
                EST. MASTER TANNERY & OEM ATELIER
              </div>

              {/* Main Headline */}
              <h1 className="text-[3.3em] font-extrabold tracking-tight text-ink leading-[1.08]">
                Crafting a new
                <br />
                age of{" "}
                <span className="relative inline-block font-serif italic text-leather">
                  genuine leather
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-leather via-amber-600 to-transparent" />
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
                Wholesale and private-label leather manufacturing — proven styles, custom
                programs, and decades of craftsmanship behind every unit.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <ButtonLink
                  href={requestQuoteHref}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 shadow-xl shadow-leather/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-leather/35"
                >
                  <span className="font-semibold tracking-wide">Request Quote</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/20 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </ButtonLink>
                <TextLink
                  href="/products"
                  withArrow
                  tone="leather"
                  className="text-base font-semibold tracking-wide transition-all hover:translate-x-1"
                >
                  View Products
                </TextLink>
              </div>

              {/* Mini Slide Filmstrip Selector */}
              <div className="mt-4 flex w-full flex-col gap-3 border-t border-stone-200/80 pt-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink/50">
                  <span>Current Programs</span>
                  <span>{activeSlide + 1} of {slides.length}</span>
                </div>

                <div className="flex gap-3">
                  {slides.map((s, idx) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => {
                        setActiveSlide(idx);
                        setActiveHotspot(null);
                      }}
                      className={cn(
                        "group relative flex flex-1 items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300",
                        activeSlide === idx
                          ? "border-leather/40 bg-white shadow-md shadow-leather/10"
                          : "border-stone-200/70 bg-stone-100/60 hover:bg-white/80"
                      )}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className={cn(
                          "truncate text-xs font-bold transition-colors",
                          activeSlide === idx ? "text-leather" : "text-ink"
                        )}>
                          {s.title}
                        </p>
                        <p className="truncate text-[11px] text-ink/50 font-medium">
                          {s.stat}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Hotspot Stage */}
            <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:col-span-7 lg:max-w-none">
              {/* Rotating Haute Atelier Seal */}
              <div className="pointer-events-none absolute -right-4 -top-8 z-30 hidden sm:block lg:-right-8 lg:-top-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="relative flex h-28 w-28 items-center justify-center rounded-full border border-leather/30 bg-paper/90 p-2 shadow-2xl backdrop-blur-xl"
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="fill-leather text-[8.5px] font-bold uppercase tracking-[0.24em]">
                      <textPath href="#circlePath">
                        • GENUINE CRAFTSMANSHIP • MASTER TANNERY
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-leather text-paper shadow-md">
                    <span className="font-serif text-sm font-bold">O</span>
                  </div>
                </motion.div>
              </div>

              {/* 3D Perspective Card Container */}
              <div
                style={{ perspective: 1200 }}
                className="relative w-full max-w-md lg:max-w-[500px]"
              >
                <motion.div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative aspect-[3/4.2] w-full cursor-crosshair overflow-hidden rounded-[2.5rem] border border-white/60 bg-stone-900 shadow-[0_30px_70px_-15px_rgba(28,25,23,0.35)]"
                >
                  {/* Image with Crossfade */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.image}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 500px, 90vw"
                        className="object-cover"
                      />
                      {/* Editorial Vignette */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-black/30" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Hotspots / Inspection Radars */}
                  {current.hotspots.map((spot, i) => {
                    const isActive = activeHotspot === i;
                    return (
                      <div
                        key={spot.label}
                        style={{
                          left: spot.x,
                          top: spot.y,
                          transform: "translate(-50%, -50%) translateZ(40px)",
                        }}
                        className="absolute z-30"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(isActive ? null : i);
                          }}
                          onMouseEnter={() => setActiveHotspot(i)}
                          aria-label={`Inspect ${spot.label}`}
                          className="group relative flex h-7 w-7 items-center justify-center focus:outline-none"
                        >
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                          <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-leather shadow-lg transition-transform duration-300 group-hover:scale-125">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          </span>
                        </button>

                        {/* Interactive Spec Tooltip Popover */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              style={{ transform: "translateZ(60px)" }}
                              className="absolute left-1/2 top-8 z-40 w-56 -translate-x-1/2 rounded-2xl border border-white/40 bg-ink/95 p-3.5 text-paper shadow-2xl backdrop-blur-xl"
                            >
                              <div className="flex items-center gap-1.5 pb-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                                  {spot.label}
                                </span>
                              </div>
                              <p className="text-xs leading-snug text-paper/85 font-normal">
                                {spot.spec}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Glass Bottom Bar on Image */}
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 text-paper backdrop-blur-md"
                  >
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-300">
                        {current.category}
                      </span>
                      <p className="text-sm font-bold text-white">
                        {current.title}
                      </p>
                    </div>
                    <span className="rounded-full bg-paper/20 px-3 py-1 text-xs font-semibold text-paper">
                      Hover Points •
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}