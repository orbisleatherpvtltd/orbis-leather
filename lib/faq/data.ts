import { prisma } from "@/lib/db";
import { faqEntries, type FaqEntry } from "@/lib/content/faq";

/**
 * Abstract FAQ data-access layer, backed by Prisma. Falls back to the
 * conservative static copy in lib/content/faq.ts if the DB has no rows yet
 * (pre-seed), so the public /faq page never renders empty.
 */
export async function getPublishedFaqs(): Promise<FaqEntry[]> {
  try {
    const rows = await prisma.faqItem.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rows.length === 0) return faqEntries;

    return rows.map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
    }));
  } catch (error) {
    console.warn("getPublishedFaqs: falling back to static FAQ content", error);
    return faqEntries;
  }
}
