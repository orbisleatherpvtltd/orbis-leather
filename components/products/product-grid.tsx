import { ProductCard } from "@/components/products/product-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import type { Product } from "@/lib/products/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="text-body text-ink/60">
        No products are published in this category yet. Check back soon, or contact us directly.
      </p>
    );
  }

  return (
    <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
