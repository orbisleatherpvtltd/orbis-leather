import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import type { Product } from "@/lib/products/types";

export function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];

  return (
    <Card>
      <Link href={`/products/${product.slug}`} aria-hidden="true" tabIndex={-1} className="relative block">
        <ImageFrame
          src={primaryImage?.url}
          alt={primaryImage?.altText ?? product.name}
          ratio="portrait"
        />
        {(product.featured || product.isSampleContent) && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.featured && <Badge variant="ink">Featured</Badge>}
            {product.isSampleContent && <Badge variant="leather">Sample Content</Badge>}
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
        {product.leatherType && (
          <p className="text-caption uppercase tracking-wide text-ink/60">{product.leatherType}</p>
        )}
        <CardDescription>{product.shortDescription}</CardDescription>
        <CardFooter>
          <ButtonLink
            href={`/request-quote?product=${product.slug}`}
            variant="outline"
            size="sm"
          >
            Request Quote
          </ButtonLink>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
