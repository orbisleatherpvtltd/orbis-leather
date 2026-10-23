import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import type { Product } from "@/lib/products/types";

export function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];

  const specLine = product.leatherType
    ? `${product.leatherType} · MOQ ${product.moq}`
    : product.moq
      ? `MOQ ${product.moq}`
      : null;

  return (
    <Card>
      <Link href={`/products/${product.slug}`} aria-hidden="true" tabIndex={-1} className="relative block">
        <ImageFrame
          src={primaryImage?.url}
          alt={primaryImage?.altText ?? product.name}
          ratio="portrait"
        />
        {!primaryImage && (
          <span className="absolute inset-x-0 bottom-3 text-center text-caption text-ink/40">
            Photo coming soon
          </span>
        )}
        {product.featured && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge variant="ink">Featured</Badge>
          </div>
        )}
      </Link>
      <CardBody>
        <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
          {product.category.name}
        </span>
        <CardTitle>
          <Link href={`/products/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </CardTitle>
        {specLine && (
          <p className="text-caption uppercase tracking-wide text-ink/60">{specLine}</p>
        )}
        <CardDescription>{product.shortDescription}</CardDescription>
        <CardFooter>
          <ButtonLink
            href={`/request-quote?product=${product.slug}`}
            variant="outline"
            size="sm"
            aria-label={`Request quote for ${product.name}`}
          >
            Request Quote
          </ButtonLink>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
