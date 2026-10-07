"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/site-config";

export function NavLinks({
  linkClassName,
  onNavigate,
}: {
  linkClassName: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {primaryNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
          onClick={onNavigate}
          className={linkClassName}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
