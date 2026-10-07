import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { ImageFrame } from "@/components/ui/image-frame";
import { CategoryBadge } from "@/components/blog/category-badge";
import { formatBlogDate } from "@/lib/blog/format";
import type { BlogPost } from "@/lib/blog/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card>
      <Link href={`/blog/${post.slug}`} aria-hidden="true" tabIndex={-1} className="block">
        <ImageFrame src={post.heroImage.url} alt={post.heroImage.altText} ratio="video" />
      </Link>
      <CardBody>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={post.category} />
          {post.isSampleContent && <Badge variant="leather">Sample Content</Badge>}
        </div>
        <CardTitle>
          <Link href={`/blog/${post.slug}`} className="link-underline">
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-caption uppercase tracking-wide text-ink/60">
          {formatBlogDate(post.publishedAt)} · {post.author}
        </p>
        <CardDescription>{post.excerpt}</CardDescription>
        <CardFooter>
          <Link
            href={`/blog/${post.slug}`}
            className="link-underline text-body font-medium text-ink hover:text-leather"
          >
            Read Article
          </Link>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
