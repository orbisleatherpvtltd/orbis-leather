import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogCategory } from "@/lib/blog/types";

export function CategoryBadge({
  category,
  asLink = true,
}: {
  category: BlogCategory;
  asLink?: boolean;
}) {
  if (!asLink) {
    return (
      <Badge variant="outline" className="w-fit">
        {category.name}
      </Badge>
    );
  }

  return (
    <Link href={`/blog?category=${category.slug}`}>
      <Badge variant="outline" className="w-fit transition-colors duration-200 hover:border-ink">
        {category.name}
      </Badge>
    </Link>
  );
}
