import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ShopProductCard } from "@/components/home/shop-product-card";
import { SpecialProgramCard } from "@/components/home/special-program-card";
import type { Product, ProductCategory } from "@/lib/products/types";

export function BrowseShopSection({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const special =
    products.find((product) => product.category.slug === "custom-private-label") ??
    products[products.length - 1];
  const gridProducts = products.filter((product) => product.id !== special?.id).slice(0, 4);
  const specialImage = special?.images.find((image) => image.isPrimary) ?? special?.images[0];

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

        {gridProducts.length === 0 ? (
          <p className="text-body text-ink/60">Check back soon for published products.</p>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridProducts[0] && (
              <StaggerItem className="lg:col-start-1 lg:row-start-1">
                <ShopProductCard product={gridProducts[0]} />
              </StaggerItem>
            )}
            {gridProducts[1] && (
              <StaggerItem className="lg:col-start-1 lg:row-start-2">
                <ShopProductCard product={gridProducts[1]} />
              </StaggerItem>
            )}
            {special && specialImage && (
              <StaggerItem className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <SpecialProgramCard
                  href={`/products/${special.slug}`}
                  image={specialImage.url ?? ""}
                  alt={specialImage.altText}
                  name={special.name}
                  category={special.category.name}
                />
              </StaggerItem>
            )}
            {gridProducts[2] && (
              <StaggerItem className="lg:col-start-3 lg:row-start-1">
                <ShopProductCard product={gridProducts[2]} />
              </StaggerItem>
            )}
            {gridProducts[3] && (
              <StaggerItem className="lg:col-start-3 lg:row-start-2">
                <ShopProductCard product={gridProducts[3]} />
              </StaggerItem>
            )}
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
