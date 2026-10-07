import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { lifestyleImage } from "@/lib/dummy-images";
import type { Product } from "@/lib/products/types";

export function LifestyleBanner({ product }: { product: Product | null }) {
  const tags = [product?.leatherType, product?.moq, product?.leadTime].filter(
    (value): value is string => Boolean(value),
  );

  return (
    <Section size="lg">
      <Reveal className="relative overflow-hidden rounded-3xl shadow-2xl shadow-ink/20">
        <ImageFrame
          src={lifestyleImage(3, 1800)}
          alt="Model wearing a leather jacket in a cold-weather outdoor setting (placeholder)"
          ratio="wide"
          zoom={false}
          className="min-h-[380px] sm:min-h-[440px]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />

        <div className="absolute inset-0 flex flex-col justify-end gap-4 p-8 sm:p-12">
          <h2 className="max-w-lg text-h2 font-bold leading-tight text-paper">
            Built for every <span className="italic text-leather">cold-weather</span> program
          </h2>
          <p className="max-w-md text-body-lg text-paper/75">
            {product
              ? `${product.name} — ${product.shortDescription}`
              : "Shearling-collar bombers, oiled lambskin, and quilted linings, produced to your specification."}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-paper/10 px-4 py-1.5 text-caption font-medium text-paper ring-1 ring-paper/20 backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <ButtonLink
            href={product ? `/products/${product.slug}` : "/products"}
            variant="reverse"
            className="w-fit"
          >
            View Program
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
