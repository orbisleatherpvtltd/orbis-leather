import { prisma } from "@/lib/db";
import { createProduct } from "@/lib/actions/product";
import { ProductForm } from "@/components/admin/product-form";

export default async function AdminNewProductPage() {
  const categories = await prisma.productCategory.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">New Product</h1>
      <ProductForm
        action={createProduct}
        categories={categories}
        submitLabel="Create Product"
        defaultValues={{
          slug: "",
          name: "",
          categoryId: "",
          shortDescription: "",
          description: "",
          leatherType: "",
          priceRange: "",
          moq: "",
          leadTime: "",
          isPrivateLabel: false,
          isFeatured: false,
          status: "DRAFT",
          seoTitle: "",
          seoDescription: "",
          customizationOptions: [],
          images: [],
        }}
      />
    </div>
  );
}
