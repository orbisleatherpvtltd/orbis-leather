import { z } from "zod";
import {
  BUYER_TYPES,
  DELIVERY_OPTIONS,
  EMBROIDERY_PLACEMENTS,
  HEARD_ABOUT_OPTIONS,
  INQUIRY_TYPES,
  LABEL_OPTIONS,
  SAMPLE_OPTIONS,
  isGeneralInquiry,
} from "@/lib/inquiries/fields";

export const inquirySchema = z
  .object({
    name: z.string().trim().min(1, "Full name is required.").max(120),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .max(254)
      .email("Enter a valid email address."),
    phone: z.string().trim().max(40).optional(),
    companyName: z.string().trim().max(150).optional(),
    country: z.string().trim().min(1, "Country is required.").max(100),
    buyerType: z.enum(BUYER_TYPES, { error: "Tell us what kind of buyer you are." }),
    inquiryType: z.enum(INQUIRY_TYPES, { error: "Select an inquiry type." }),
    jacketStyle: z.string().trim().max(300).optional(),
    quantityPerStyle: z.string().trim().max(10).optional(),
    numberOfStyles: z.string().trim().max(10).optional(),
    customEmbroidery: z.enum(["No", "Yes"]).optional(),
    embroideryPlacement: z.array(z.enum(EMBROIDERY_PLACEMENTS)).optional(),
    ownLabels: z.enum(LABEL_OPTIONS).optional(),
    leatherType: z.string().trim().max(150).optional(),
    sampleFirst: z.enum(SAMPLE_OPTIONS).optional(),
    delivery: z.enum(DELIVERY_OPTIONS).optional(),
    targetPrice: z.string().trim().max(20).optional(),
    message: z.string().trim().max(5000).optional(),
    heardAbout: z.enum(HEARD_ABOUT_OPTIONS).optional(),
    consent: z.literal("yes", { error: "Please agree so we can contact you about this inquiry." }),
  })
  .superRefine((data, ctx) => {
    if (isGeneralInquiry(data.inquiryType)) {
      if (!data.message) {
        ctx.addIssue({
          code: "custom",
          path: ["message"],
          message: "Please tell us about your question.",
        });
      }
      return;
    }

    const quantity = Number(data.quantityPerStyle);
    if (!data.quantityPerStyle || !Number.isInteger(quantity) || quantity < 5) {
      ctx.addIssue({
        code: "custom",
        path: ["quantityPerStyle"],
        message: "Minimum 5 pieces per style.",
      });
    }

    if (data.numberOfStyles) {
      const styles = Number(data.numberOfStyles);
      if (!Number.isInteger(styles) || styles < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["numberOfStyles"],
          message: "Enter a whole number of styles.",
        });
      }
    }

    if (data.targetPrice && Number.isNaN(Number(data.targetPrice))) {
      ctx.addIssue({
        code: "custom",
        path: ["targetPrice"],
        message: "Enter a number in USD.",
      });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
