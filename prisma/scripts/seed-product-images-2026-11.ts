// One-off script: seeds real product photography (replacing the stock-photo
// rows deleted in sync-products-2026-10.ts) for all 9 published products.
// Run once via `tsx`:
//   npx tsx prisma/scripts/seed-product-images-2026-11.ts
import "dotenv/config";
import { prisma } from "@/lib/db";

type ImageSeed = { file: string; alt: string };

const productImages: Record<string, ImageSeed[]> = {
  "aviator-bomber-jacket": [
    { file: "01-front-view.jpg", alt: "Aviator Bomber Jacket — front view" },
    { file: "02-back-view.jpg", alt: "Aviator Bomber Jacket — back view" },
    { file: "03-flat-lay.jpg", alt: "Aviator Bomber Jacket — flat lay" },
    { file: "04-collar-zipper-detail.jpg", alt: "Aviator Bomber Jacket — shearling collar and zipper detail" },
    { file: "05-stitching-leather-grain.jpg", alt: "Aviator Bomber Jacket — stitching and leather grain detail" },
    { file: "06-ribbed-cuff-hem.jpg", alt: "Aviator Bomber Jacket — ribbed cuff and hem detail" },
    { file: "07-side-profile.jpg", alt: "Aviator Bomber Jacket — side profile" },
  ],
  "cafe-racer-jacket": [
    { file: "01-front-view.jpg", alt: "Café Racer Jacket — front view" },
    { file: "02-back-view.jpg", alt: "Café Racer Jacket — back view" },
    { file: "03-neckline-zipper.jpg", alt: "Café Racer Jacket — neckline and zipper detail" },
    { file: "04-leather-grain-stitching.jpg", alt: "Café Racer Jacket — leather grain and stitching detail" },
    { file: "05-pocket-cuff-zippers.jpg", alt: "Café Racer Jacket — pocket and cuff zipper detail" },
    { file: "06-side-profile.jpg", alt: "Café Racer Jacket — side profile" },
  ],
  "classic-biker-jacket": [
    { file: "01-front-hero.jpg", alt: "Classic Biker Jacket — front hero image" },
    { file: "02-back-view.jpg", alt: "Classic Biker Jacket — back view" },
    { file: "03-collar-lapel-closeup.jpg", alt: "Classic Biker Jacket — collar and lapel close-up" },
    { file: "04-leather-grain-stitching.jpg", alt: "Classic Biker Jacket — leather grain and stitching detail" },
    { file: "05-asymmetric-zipper-detail.jpg", alt: "Classic Biker Jacket — asymmetric zipper detail" },
    { file: "06-hardware-details.jpg", alt: "Classic Biker Jacket — hardware details" },
    { file: "07-side-profile-shoulder.jpg", alt: "Classic Biker Jacket — side profile and shoulder" },
  ],
  "cropped-leather-jacket": [
    { file: "01-front-hero.jpg", alt: "Cropped Leather Jacket — front hero image" },
    { file: "02-back-view.jpg", alt: "Cropped Leather Jacket — back view" },
    { file: "03-flat-lay.jpg", alt: "Cropped Leather Jacket — flat lay" },
    { file: "04-collar-zipper.jpg", alt: "Cropped Leather Jacket — collar and zipper detail" },
    { file: "05-stitching-grain.jpg", alt: "Cropped Leather Jacket — stitching and grain detail" },
    { file: "06-side-view-length.jpg", alt: "Cropped Leather Jacket — side view and length" },
    { file: "07-leather-softness.jpg", alt: "Cropped Leather Jacket — leather softness detail" },
    { file: "08-hem-cuff.jpg", alt: "Cropped Leather Jacket — hem and cuff detail" },
  ],
  "custom-embroidery-jacket": [
    { file: "01-back-hero.jpg", alt: "Custom Embroidery Jacket — back hero image" },
    { file: "02-front-view.jpg", alt: "Custom Embroidery Jacket — front view" },
    { file: "03-flat-lay.jpg", alt: "Custom Embroidery Jacket — flat lay" },
    { file: "04-embroidery-macro.jpg", alt: "Custom Embroidery Jacket — embroidery macro detail" },
    { file: "05-leather-grain-thread.jpg", alt: "Custom Embroidery Jacket — leather grain and thread detail" },
    { file: "06-production-process.jpg", alt: "Custom Embroidery Jacket — embroidery production process" },
  ],
  "custom-leather-jacket-program": [
    { file: "01-sketch-detail.jpg", alt: "Custom Leather Jacket Program — design sketch detail" },
    { file: "02-pattern-pieces.jpg", alt: "Custom Leather Jacket Program — pattern pieces" },
    { file: "03-workshop-process.jpg", alt: "Custom Leather Jacket Program — workshop process" },
    { file: "04-half-finished-sample.jpg", alt: "Custom Leather Jacket Program — half-finished sample" },
    { file: "05-finished-front.jpg", alt: "Custom Leather Jacket Program — finished sample front" },
    { file: "06-finished-back.jpg", alt: "Custom Leather Jacket Program — finished sample back" },
  ],
  "fitted-moto-jacket": [
    { file: "01-front-hero.jpg", alt: "Fitted Moto Jacket — front hero image" },
    { file: "02-back-view.jpg", alt: "Fitted Moto Jacket — back view" },
    { file: "03-collar-zipper-closeup.jpg", alt: "Fitted Moto Jacket — collar and zipper close-up" },
    { file: "04-stitching-lambskin-grain.jpg", alt: "Fitted Moto Jacket — stitching and lambskin grain detail" },
    { file: "05-side-view-tailored-waist.jpg", alt: "Fitted Moto Jacket — side view, tailored waist" },
  ],
  "longline-leather-trench": [
    { file: "01-front-full-length-hero.jpg", alt: "Longline Leather Trench — front full-length hero image" },
    { file: "02-back-view.jpg", alt: "Longline Leather Trench — full-length back view" },
    { file: "03-leather-grain-stitching.jpg", alt: "Longline Leather Trench — leather grain and stitching detail" },
    { file: "04-side-profile.jpg", alt: "Longline Leather Trench — full-length side profile" },
    { file: "05-belt-buckle-detail.jpg", alt: "Longline Leather Trench — belt and buckle detail" },
  ],
  "private-label-outerwear-program": [
    { file: "01-front-hero.jpg", alt: "Private Label Leather Jackets — front hero image" },
    { file: "02-woven-neck-label.jpg", alt: "Private Label Leather Jackets — woven neck label" },
    { file: "03-custom-hang-tag.jpg", alt: "Private Label Leather Jackets — custom hang tag" },
    { file: "04-label-designs.jpg", alt: "Private Label Leather Jackets — label design options" },
    { file: "05-custom-hardware.jpg", alt: "Private Label Leather Jackets — custom hardware" },
    { file: "06-custom-packaging.jpg", alt: "Private Label Leather Jackets — custom packaging" },
  ],
};

async function main() {
  let created = 0;

  for (const [slug, images] of Object.entries(productImages)) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      console.log(`[SEED] Skipping "${slug}" - not found in DB.`);
      continue;
    }

    await prisma.productImage.deleteMany({ where: { productId: product.id } });

    await prisma.productImage.createMany({
      data: images.map((image, index) => ({
        productId: product.id,
        url: `/images/products/${slug}/${image.file}`,
        altText: image.alt,
        sortOrder: index,
        isPrimary: index === 0,
      })),
    });
    created += images.length;
    console.log(`[SEED] "${slug}": ${images.length} images`);
  }

  console.log(`[SEED] Done. ${created} images created across ${Object.keys(productImages).length} products.`);
}

main()
  .catch((error) => {
    console.error("[SEED] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
