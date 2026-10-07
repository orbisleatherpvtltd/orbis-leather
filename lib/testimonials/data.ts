import { prisma } from "@/lib/db";
import type { Testimonial } from "@/lib/testimonials/types";

/**
 * Abstract testimonials data-access layer. No site-facing section consumes
 * this yet — the homepage itself hasn't been designed in any prior phase —
 * but the admin CRUD and this layer are ready for whichever future phase
 * adds a testimonials section.
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });

  return rows.map((row) => ({
    id: row.id,
    companyName: row.companyName,
    personName: row.personName ?? undefined,
    role: row.role ?? undefined,
    quote: row.quote,
    logoUrl: row.logoUrl ?? undefined,
    sortOrder: row.sortOrder,
  }));
}
