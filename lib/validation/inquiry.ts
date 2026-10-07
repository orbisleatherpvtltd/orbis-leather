import { z } from "zod";

export const inquirySchema = z
  .object({
    type: z.enum(["QUOTE", "CONTACT"]),
    name: z.string().trim().min(1, "Full name is required.").max(120),
    companyName: z.string().trim().max(150).optional(),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .max(254)
      .email("Enter a valid email address."),
    phone: z.string().trim().max(30).optional(),
    country: z.string().trim().max(100).optional(),
    productInterest: z.string().trim().max(150).optional(),
    quantityEstimate: z.string().trim().max(50).optional(),
    message: z
      .string()
      .trim()
      .min(1, "Please share a few details about your inquiry.")
      .max(5000),
  })
  .refine((data) => data.type !== "QUOTE" || !!data.companyName, {
    message: "Company name is required.",
    path: ["companyName"],
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
