"use client";

import { useState } from "react";
import { ImageFrame } from "@/components/ui/image-frame";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/products/types";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <ImageFrame
        src={active?.url}
        alt={active?.altText ?? productName}
        ratio="portrait"
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="rounded-3xl shadow-2xl shadow-ink/10"
      />
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image: ${image.altText}`}
              aria-current={index === activeIndex}
              className={cn(
                "overflow-hidden rounded-xl ring-2 transition-all duration-200 hover:scale-105",
                index === activeIndex ? "ring-ink" : "ring-transparent hover:ring-ink/40",
              )}
            >
              <ImageFrame src={image.url} alt={image.altText} ratio="square" zoom={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
