"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ShopProductCard } from "@/components/home/shop-product-card";
import { ChevronRightIcon } from "@/components/icons";
import type { Product } from "@/lib/products/types";

export function RelatedCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  function scrollBy(direction: number) {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-8">
      <Reveal className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
            More From The Catalog
          </span>
          <h2 className="text-h2 font-bold text-ink">You May Also Like</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-ink transition-all duration-200 hover:scale-105 hover:border-ink"
          >
            <ChevronRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-ink transition-all duration-200 hover:scale-105 hover:border-ink"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </Reveal>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[220px] shrink-0 snap-start sm:w-[260px]">
            <ShopProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
