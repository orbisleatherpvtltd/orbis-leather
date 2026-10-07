import Link from "next/link";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProduct, toggleProductStatus, toggleProductFeatured } from "@/lib/actions/product";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-bold text-ink">Products</h1>
        <ButtonLink href="/admin/products/new" variant="primary">
          New Product
        </ButtonLink>
      </div>

      <div className="overflow-x-auto rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-body-sm">
          <thead className="border-b border-ink/10 bg-zinc-50 text-caption uppercase tracking-wide text-ink/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">
                  {product.name}
                  {product.isSampleContent && (
                    <Badge variant="leather" className="ml-2">
                      Sample
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-ink/60">{product.category?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge variant={product.status === "PUBLISHED" ? "ink" : "outline"}>
                    {product.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">{product.isFeatured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <form
                      action={toggleProductStatus.bind(
                        null,
                        product.id,
                        product.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                      )}
                    >
                      <button type="submit" className="text-body-sm text-ink/60 hover:text-ink">
                        {product.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={toggleProductFeatured.bind(null, product.id, !product.isFeatured)}>
                      <button type="submit" className="text-body-sm text-ink/60 hover:text-ink">
                        {product.isFeatured ? "Unfeature" : "Feature"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-body-sm text-ink/60 hover:text-ink"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteProduct.bind(null, product.id)}
                      confirmText={`Delete "${product.name}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/60">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
