import Link from "next/link";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteBlogPost, toggleBlogPostStatus } from "@/lib/actions/blog";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-bold text-ink">Blog</h1>
        <ButtonLink href="/admin/blog/new" variant="primary">
          New Post
        </ButtonLink>
      </div>

      <div className="overflow-x-auto rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-body-sm">
          <thead className="border-b border-ink/10 bg-zinc-50 text-caption uppercase tracking-wide text-ink/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Publish Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">
                  {post.title}
                  {post.isSampleContent && (
                    <Badge variant="leather" className="ml-2">
                      Sample
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-ink/60">{post.category?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge variant={post.status === "PUBLISHED" ? "ink" : "outline"}>{post.status}</Badge>
                </td>
                <td className="px-4 py-3 text-ink/60">
                  {post.publishedAt ? post.publishedAt.toLocaleDateString() : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <form
                      action={toggleBlogPostStatus.bind(
                        null,
                        post.id,
                        post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                      )}
                    >
                      <button type="submit" className="text-body-sm text-ink/60 hover:text-ink">
                        {post.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-body-sm text-ink/60 hover:text-ink"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteBlogPost.bind(null, post.id)}
                      confirmText={`Delete "${post.title}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/60">
                  No blog posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
