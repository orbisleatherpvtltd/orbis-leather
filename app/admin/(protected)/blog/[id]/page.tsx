import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateBlogPost } from "@/lib/actions/blog";
import { BlogForm } from "@/components/admin/blog-form";

function toDatetimeLocal(date: Date | null): string {
  if (!date) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default async function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">Edit Blog Post</h1>
      <BlogForm
        action={updateBlogPost.bind(null, post.id)}
        categories={categories}
        submitLabel="Save Changes"
        defaultValues={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? "",
          content: post.content ?? "",
          heroImageUrl: post.heroImageUrl ?? "",
          categoryId: post.categoryId ?? "",
          tags: post.tags,
          author: post.author ?? "",
          status: post.status,
          publishedAt: toDatetimeLocal(post.publishedAt),
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
          ogImageUrl: post.ogImageUrl ?? "",
        }}
      />
    </div>
  );
}
