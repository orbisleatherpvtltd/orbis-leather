import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/lib/blog/types";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h2 className="text-h3 font-bold text-ink">Related Articles</h2>
      </Reveal>
      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.id}>
            <BlogCard post={post} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
