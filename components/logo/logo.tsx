import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type LogoLayout = "horizontal" | "stacked" | "mark";
type LogoTone = "default" | "reverse" | "mono";

export type LogoProps = {
  /** horizontal = mark beside wordmark (header); stacked = mark above wordmark (primary lockup); mark = emblem only */
  layout?: LogoLayout;
  /** default = ink + leather accent; reverse = white lockup for dark/oxblood backgrounds; mono = single flat color for one-color reproduction */
  tone?: LogoTone;
  showTagline?: boolean;
  className?: string;
};

const logoImage: Record<LogoTone, { src: string; width: number; height: number }> = {
  default: { src: "/images/Orbis.logo.png", width: 1185, height: 372 },
  reverse: { src: "/images/orbis_logo_footer.png", width: 1191, height: 378 },
  mono: { src: "/images/Orbis.logo.png", width: 1185, height: 372 },
};

const ringColor: Record<LogoTone, string> = {
  default: "text-ink",
  reverse: "text-paper",
  mono: "text-current",
};

const accentColor: Record<LogoTone, string> = {
  default: "fill-leather",
  reverse: "fill-leather",
  mono: "fill-current",
};

function Emblem({ tone, className }: { tone: LogoTone; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-8 w-8 shrink-0", ringColor[tone], className)}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="15.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20 8.5v6M20 25.5v6M8.5 20h6M25.5 20h6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="20" cy="20" r="2.25" className={accentColor[tone]} />
    </svg>
  );
}

export function Logo({
  layout = "horizontal",
  tone = "default",
  className,
}: LogoProps) {
  if (layout === "mark") {
    return <Emblem tone={tone} className={className} />;
  }

  const image = logoImage[tone];

  return (
    <Image
      src={image.src}
      alt={siteConfig.name}
      width={image.width}
      height={image.height}
      className={cn(
        "w-auto shrink-0 self-start select-none object-contain",
        layout === "stacked" ? "h-16" : "h-9",
        className,
      )}
    />
  );
}
