import Image from "next/image";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo/logo";

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  video: "aspect-video",
  wide: "aspect-[21/9]",
} as const;

export type ImageFrameProps = {
  src?: string;
  alt: string;
  ratio?: keyof typeof ratios;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
  overlay?: boolean;
  className?: string;
};

export function ImageFrame({
  src,
  alt,
  ratio = "video",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  zoom = true,
  overlay = false,
  className,
}: ImageFrameProps) {
  return (
    <div className={cn("group/frame relative overflow-hidden bg-stone-100", ratios[ratio], className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            zoom && "group-hover/frame:scale-110",
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Logo layout="mark" tone="default" className="h-8 w-8 text-ink/15" />
        </div>
      )}
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0"
        />
      )}
    </div>
  );
}
