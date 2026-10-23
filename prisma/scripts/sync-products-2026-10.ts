// One-off script: syncs the live DB's product rows to match the 2026-10
// content update in lib/products/mock-data.ts (new copy, MOQ format,
// featured flags), and deletes the stock-photo ProductImage rows that were
// backfilled against real jackets in commit 08eb7fe. Run once via `tsx`:
//   npx tsx prisma/scripts/sync-products-2026-10.ts
import { prisma } from "@/lib/db";
import { mockProducts } from "@/lib/products/mock-data";

const STYLE_SLUGS = [
  "classic-biker-jacket",
  "aviator-bomber-jacket",
  "cafe-racer-jacket",
  "fitted-moto-jacket",
  "longline-leather-trench",
  "cropped-leather-jacket",
];

const PROGRAM_SLUGS = ["custom-leather-jacket-program", "private-label-outerwear-program"];

async function main() {
  let updated = 0;
  let imagesDeleted = 0;
  let created = 0;

  for (const slug of [...STYLE_SLUGS, ...PROGRAM_SLUGS]) {
    const mock = mockProducts.find((p) => p.slug === slug);
    if (!mock) throw new Error(`No mock product found for slug "${slug}"`);

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      console.log(`[SYNC] Skipping "${slug}" - not found in DB.`);
      continue;
    }

    await prisma.product.update({
      where: { slug },
      data: {
        name: mock.name,
        shortDescription: mock.shortDescription,
        description: mock.description,
        leatherType: mock.leatherType ?? null,
        moq: mock.moq,
        isFeatured: mock.featured,
        seoTitle: mock.seoTitle,
        seoDescription: mock.seoDescription,
      },
    });
    updated += 1;

    const { count } = await prisma.productImage.deleteMany({ where: { productId: existing.id } });
    imagesDeleted += count;
  }

  const embroidery = mockProducts.find((p) => p.slug === "custom-embroidery-jacket")!;
  const existingEmbroidery = await prisma.product.findUnique({ where: { slug: embroidery.slug } });
  if (!existingEmbroidery) {
    const category = await prisma.productCategory.findUnique({
      where: { slug: embroidery.category.slug },
    });
    if (!category) throw new Error(`Missing category "${embroidery.category.slug}"`);

    await prisma.product.create({
      data: {
        slug: embroidery.slug,
        name: embroidery.name,
        categoryId: category.id,
        shortDescription: embroidery.shortDescription,
        description: embroidery.description,
        leatherType: embroidery.leatherType,
        moq: embroidery.moq,
        leadTime: embroidery.leadTime,
        specifications: embroidery.specifications,
        customizationOptions: embroidery.customizationOptions,
        isPrivateLabel: embroidery.category.slug === "custom-private-label",
        isFeatured: embroidery.featured,
        status: embroidery.status,
        isSampleContent: true,
        seoTitle: embroidery.seoTitle,
        seoDescription: embroidery.seoDescription,
      },
    });
    created += 1;
  } else {
    console.log(`[SYNC] "${embroidery.slug}" already exists - leaving as-is.`);
  }

  console.log(`[SYNC] Updated ${updated} products, deleted ${imagesDeleted} stock-photo images, created ${created} new product.`);
}

main()
  .catch((error) => {
    console.error("[SYNC] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
