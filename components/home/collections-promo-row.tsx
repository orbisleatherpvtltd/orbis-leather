import Link from "next/link";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ImageFrame } from "@/components/ui/image-frame";
import { ArrowRightIcon } from "@/components/icons";

const promos = [
  {
    label: "New Product Launches",
    caption: "Styles across 3 programs",
    href: "/products",
    image: "/images/home/promo-new-launches.jpg",
    alt: "Model wearing a new ORBIS leather outerwear style",
  },
  {
    label: "Upcoming Collections",
    caption: "Release details confirmed at quote stage",
    href: "/capabilities",
    image: "/images/home/promo-collections.jpg",
    alt: "Model wearing an ORBIS leather jacket, upcoming collection preview",
  },
];

export function CollectionsPromoRow() {
  return (
    <StaggerGroup className="grid gap-6 sm:grid-cols-2">
      {promos.map((promo) => (
        <StaggerItem key={promo.label}>
          <Link
            href={promo.href}
            className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-lg shadow-ink/10 ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/20 sm:h-80"
          >
            <ImageFrame
              src={promo.image}
              alt={promo.alt}
              className="absolute inset-0 rounded-2xl"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-body font-semibold text-paper">{promo.label}</span>
                <span className="text-caption text-paper/70">{promo.caption}</span>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowRightIcon className="h-4 w-4 -rotate-45" />
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
