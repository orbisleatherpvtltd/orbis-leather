import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-caption text-ink/60">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="link-underline hover:text-ink">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-ink" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRightIcon className="h-3.5 w-3.5" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
