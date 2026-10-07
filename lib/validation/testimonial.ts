import { z } from "zod";

export const testimonialSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required."),
  personName: z.string().trim().optional(),
  role: z.string().trim().optional(),
  quote: z.string().trim().min(1, "Quote is required."),
  logoUrl: z.string().trim().optional(),
  isPublished: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
