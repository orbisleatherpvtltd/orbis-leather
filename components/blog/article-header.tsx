import { Badge } from "@/components/ui/badge";
import { ImageFrame } from "@/components/ui/image-frame";
import { CategoryBadge } from "@/components/blog/category-badge";
import { formatBlogDate } from "@/lib/blog/format";
import type { BlogPost } from "@/lib/blog/types";
import { Reveal } from "@/components/motion/reveal";

export function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col gap-6">
      <Reveal className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={post.category} />
        {post.isSampleContent && <Badge variant="leather">Sample Content</Badge>}
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="text-h1 font-bold text-ink">{post.title}</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-caption uppercase tracking-wide text-ink/60">
          {formatBlogDate(post.publishedAt)} · {post.author}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <ImageFrame
          src={post.heroImage.url}
          alt={post.heroImage.altText}
          ratio="wide"
          priority
          sizes="100vw"
          className="rounded-3xl shadow-2xl shadow-ink/10"
        />
      </Reveal>
    </div>
  );
}
