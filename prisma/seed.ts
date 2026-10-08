import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { dummyImage } from "@/lib/dummy-images";
import { productCategories } from "@/lib/products/categories";
import { mockProducts } from "@/lib/products/mock-data";
import { blogCategories } from "@/lib/blog/categories";
import { mockBlogPosts } from "@/lib/blog/mock-data";
import { faqEntries } from "@/lib/content/faq";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@orbisleather.example";

function generatePassword(): string {
  return randomBytes(12).toString("base64url");
}

async function seedAdminUser() {
  const existing = await prisma.adminUser.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existing) {
    console.log(`[SEED] AdminUser "${ADMIN_EMAIL}" already exists — leaving password unchanged.`);
    return;
  }

  const password = process.env.ADMIN_PASSWORD || generatePassword();
  const passwordHash = await hashPassword(password);

  await prisma.adminUser.create({
    data: {
      email: ADMIN_EMAIL,
      passwordHash,
      name: "ORBIS Admin",
      role: "ADMIN",
    },
  });

  console.log("[SEED] Created AdminUser. Save these credentials now — the password is shown only once:");
  console.log(`[SEED]   email:    ${ADMIN_EMAIL}`);
  console.log(`[SEED]   password: ${password}`);
}

async function seedProductCategories() {
  for (const [index, category] of productCategories.entries()) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description, sortOrder: index },
      create: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        sortOrder: index,
      },
    });
  }
  console.log(`[SEED] Upserted ${productCategories.length} product categories.`);
}

async function seedProducts() {
  let created = 0;
  let imagesCreated = 0;

  for (const [index, product] of mockProducts.entries()) {
    const category = await prisma.productCategory.findUnique({
      where: { slug: product.category.slug },
    });
    if (!category) {
      throw new Error(`[SEED] Missing product category "${product.category.slug}" — run seedProductCategories() first.`);
    }

    let row = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!row) {
      row = await prisma.product.create({
        data: {
          slug: product.slug,
          name: product.name,
          categoryId: category.id,
          shortDescription: product.shortDescription,
          description: product.description,
          leatherType: product.leatherType,
          priceRange: product.priceRange,
          moq: product.moq,
          leadTime: product.leadTime,
          specifications: product.specifications,
          customizationOptions: product.customizationOptions,
          isPrivateLabel: product.category.slug === "custom-private-label",
          isFeatured: product.featured,
          status: product.status,
          isSampleContent: true,
          seoTitle: product.seoTitle,
          seoDescription: product.seoDescription,
        },
      });
      created += 1;
    }

    // Backfill images for products that already existed without any (e.g. from
    // before this relation was wired up) as well as freshly created ones.
    const existingImageCount = await prisma.productImage.count({ where: { productId: row.id } });
    if (existingImageCount === 0 && product.images.length > 0) {
      await prisma.productImage.createMany({
        data: product.images.map((image, imageIndex) => ({
          productId: row.id,
          url: image.url ?? dummyImage(index * 3 + imageIndex),
          altText: image.altText,
          sortOrder: imageIndex,
          isPrimary: image.isPrimary ?? imageIndex === 0,
        })),
      });
      imagesCreated += product.images.length;
    }
  }

  console.log(`[SEED] Created ${created} sample products (isSampleContent: true).`);
  console.log(`[SEED] Created ${imagesCreated} product images.`);
}

async function seedBlogCategories() {
  for (const [index, category] of blogCategories.entries()) {
    await prisma.blogCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description, sortOrder: index },
      create: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        sortOrder: index,
      },
    });
  }
  console.log(`[SEED] Upserted ${blogCategories.length} blog categories.`);
}

async function seedBlogPosts() {
  let created = 0;
  for (const post of mockBlogPosts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) continue;

    const category = post.category
      ? await prisma.blogCategory.findUnique({ where: { slug: post.category.slug } })
      : null;

    await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        heroImageUrl: post.heroImage?.url,
        categoryId: category?.id,
        tags: post.tags,
        author: post.author,
        status: post.status,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        ogImageUrl: post.ogImage?.url,
        isSampleContent: true,
      },
    });
    created += 1;
  }
  console.log(`[SEED] Created ${created} sample blog posts (isSampleContent: true).`);
}

async function seedFaqItems() {
  let created = 0;
  for (const [index, entry] of faqEntries.entries()) {
    const existing = await prisma.faqItem.findFirst({ where: { question: entry.question } });
    if (existing) continue;

    await prisma.faqItem.create({
      data: {
        question: entry.question,
        answer: entry.answer,
        sortOrder: index,
        isPublished: true,
      },
    });
    created += 1;
  }
  console.log(`[SEED] Created ${created} FAQ items (isPublished: true).`);
}

async function main() {
  console.log("[SEED] Starting database seed...");
  await seedAdminUser();
  await seedProductCategories();
  await seedProducts();
  await seedBlogCategories();
  await seedBlogPosts();
  await seedFaqItems();
  console.log("[SEED] Skipping testimonials — no fake testimonials are seeded. Add real ones via /admin/testimonials.");
  console.log("[SEED] Done.");
}

main()
  .catch((error) => {
    console.error("[SEED] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
