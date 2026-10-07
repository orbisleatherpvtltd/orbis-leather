import { z } from "zod";

export const faqItemSchema = z.object({
  question: z.string().trim().min(1, "Question is required."),
  answer: z.string().trim().min(1, "Answer is required."),
  category: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(false),
});

export type FaqItemInput = z.infer<typeof faqItemSchema>;
