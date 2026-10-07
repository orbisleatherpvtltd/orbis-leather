import { prisma } from "@/lib/db";
import { createBlogPost } from "@/lib/actions/blog";
import { BlogForm } from "@/components/admin/blog-form";

export default async function AdminNewBlogPostPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">New Blog Post</h1>
      <BlogForm
        action={createBlogPost}
        categories={categories}
        submitLabel="Create Post"
        defaultValues={{
          slug: "",
          title: "",
          excerpt: "",
          content: "",
          heroImageUrl: "",
          categoryId: "",
          tags: [],
          author: "",
          status: "DRAFT",
          publishedAt: "",
          seoTitle: "",
          seoDescription: "",
          ogImageUrl: "",
        }}
      />
    </div>
  );
}
