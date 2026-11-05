import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ShopProductCard } from "@/components/home/shop-product-card";
import type { Product, ProductCategory } from "@/lib/products/types";

export function BrowseShopSection({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  return (
    <Section size="md" tone="stone">
      <div className="flex flex-col gap-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-h2 font-bold text-ink">Browse Shop</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className="rounded-full bg-ink px-4 py-1.5 text-caption font-medium text-paper"
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="rounded-full border border-stone-200 bg-paper px-4 py-1.5 text-caption font-medium text-ink/70 transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </Reveal>

        {products.length === 0 ? (
          <p className="text-body text-ink/60">Check back soon for published products.</p>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ShopProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        <Reveal>
          <ButtonLink href="/products" variant="outline" className="w-fit">
            View All Products
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
