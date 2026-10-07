import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons";

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  withArrow?: boolean;
  tone?: "ink" | "leather" | "reverse";
};

const tones = {
  ink: "text-ink",
  leather: "text-leather",
  reverse: "text-paper",
};

export function TextLink({
  href,
  withArrow = false,
  tone = "ink",
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "link-underline group inline-flex items-center gap-1.5 font-medium",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && (
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
