import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ImageFrame } from "@/components/ui/image-frame";
import { TextLink } from "@/components/ui/text-link";
import { lifestyleImage } from "@/lib/dummy-images";
import type { Product } from "@/lib/products/types";

export function CompleteTheProgram({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <Section size="md">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal direction="right">
          <ImageFrame
            src={lifestyleImage(2, 1200)}
            alt="Model wearing a leather jacket in an editorial autumn setting (placeholder)"
            ratio="portrait"
            className="rounded-3xl shadow-2xl shadow-ink/10"
          />
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
              Build Your Program
            </span>
            <h2 className="text-h2 font-bold text-ink">Pair this style with a full program</h2>
            <p className="max-w-md text-body-lg text-ink/70">
              Every style shown here can be sourced alone or bundled into a private-label
              program with matching trims, hardware, and packaging.
            </p>
          </div>

          <StaggerGroup className="flex flex-col divide-y divide-stone-200">
            {products.slice(0, 3).map((product) => {
              const image = product.images.find((img) => img.isPrimary) ?? product.images[0];
              return (
                <StaggerItem key={product.id} className="flex items-center gap-4 py-4 first:pt-0">
                  <ImageFrame
                    src={image?.url}
                    alt={image?.altText ?? product.name}
                    ratio="square"
                    className="w-16 shrink-0 rounded-xl"
                    zoom={false}
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-body font-semibold text-ink">{product.name}</span>
                    <span className="text-caption text-ink/50">
                      {product.leatherType ?? product.category.name}
                    </span>
                  </div>
                  <TextLink href={`/products/${product.slug}`} withArrow tone="leather" className="shrink-0">
                    Request Quote
                  </TextLink>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Reveal>
      </div>
    </Section>
  );
}
