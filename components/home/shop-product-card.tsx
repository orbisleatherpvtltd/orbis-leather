import Link from "next/link";
import { ImageFrame } from "@/components/ui/image-frame";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products/types";

const dotTones = ["bg-leather", "bg-ink/70", "bg-stone-300"];

export function ShopProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        <ImageFrame
          src={primaryImage?.url}
          alt={primaryImage?.altText ?? product.name}
          ratio="portrait"
          className="rounded-2xl shadow-lg shadow-ink/5 ring-1 ring-ink/5"
        />
        {(product.featured || product.isSampleContent) && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.featured && <Badge variant="ink">Featured</Badge>}
            {product.isSampleContent && <Badge variant="leather">Sample Content</Badge>}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-body font-semibold text-ink transition-colors duration-200 group-hover:text-leather">
          {product.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-caption text-ink/50">{product.category.name}</span>
          <span className="flex items-center gap-1" aria-hidden="true">
            {dotTones.map((tone, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${tone}`} />
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
