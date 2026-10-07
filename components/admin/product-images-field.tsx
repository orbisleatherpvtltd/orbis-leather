"use client";

import { useId, useState } from "react";
import { MediaPicker } from "@/components/admin/media-picker";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/button";

export type ProductImageEntry = {
  key: string;
  url: string;
  altText: string;
  isPrimary: boolean;
};

export function ProductImagesField({ defaultImages }: { defaultImages: ProductImageEntry[] }) {
  const genKey = useId();
  const [images, setImages] = useState<ProductImageEntry[]>(defaultImages);

  function update(key: string, patch: Partial<ProductImageEntry>) {
    setImages((prev) => prev.map((image) => (image.key === key ? { ...image, ...patch } : image)));
  }

  function makePrimary(key: string) {
    setImages((prev) => prev.map((image) => ({ ...image, isPrimary: image.key === key })));
  }

  function remove(key: string) {
    setImages((prev) => prev.filter((image) => image.key !== key));
  }

  function add() {
    setImages((prev) => [
      ...prev,
      { key: `${genKey}-${prev.length}-${Date.now()}`, url: "", altText: "", isPrimary: prev.length === 0 },
    ]);
  }

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name="imagesJson" value={JSON.stringify(images.filter((i) => i.url))} />

      {images.map((image) => (
        <div key={image.key} className="flex items-start gap-4 rounded-md border border-ink/10 p-4">
          <MediaPicker
            label="Image"
            value={image.url}
            onChange={(url) => update(image.key, { url })}
          />
          <div className="flex flex-1 flex-col gap-2">
            <Input
              placeholder="Alt text (for accessibility & SEO)"
              value={image.altText}
              onChange={(event) => update(image.key, { altText: event.target.value })}
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => makePrimary(image.key)}
                className={
                  image.isPrimary
                    ? "text-body-sm font-medium text-leather"
                    : "text-body-sm text-ink/60 hover:text-ink"
                }
              >
                {image.isPrimary ? "Primary image" : "Make primary"}
              </button>
              <button
                type="button"
                onClick={() => remove(image.key)}
                className="text-body-sm text-ink/60 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={add} className="w-fit">
        Add Image
      </Button>
    </div>
  );
}
