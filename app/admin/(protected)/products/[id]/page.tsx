import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateProduct } from "@/lib/actions/product";
import { ProductForm } from "@/components/admin/product-form";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.productCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">Edit Product</h1>
      <ProductForm
        action={updateProduct.bind(null, product.id)}
        categories={categories}
        submitLabel="Save Changes"
        defaultValues={{
          slug: product.slug,
          name: product.name,
          categoryId: product.categoryId ?? "",
          shortDescription: product.shortDescription ?? "",
          description: product.description ?? "",
          leatherType: product.leatherType ?? "",
          priceRange: product.priceRange ?? "",
          moq: product.moq ?? "",
          leadTime: product.leadTime ?? "",
          isPrivateLabel: product.isPrivateLabel,
          isFeatured: product.isFeatured,
          status: product.status,
          seoTitle: product.seoTitle ?? "",
          seoDescription: product.seoDescription ?? "",
          customizationOptions: product.customizationOptions,
          images: product.images.map((image) => ({
            key: image.id,
            url: image.url,
            altText: image.altText,
            isPrimary: image.isPrimary,
          })),
        }}
      />
    </div>
  );
}
