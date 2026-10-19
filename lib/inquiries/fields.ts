export const INQUIRY_TYPES = [
  "Quote for leather jackets",
  "Custom embroidery jacket",
  "Private label",
  "Sample request",
  "General question",
] as const;

export const BUYER_TYPES = [
  "Startup or new brand",
  "Existing brand",
  "Wholesaler or retailer",
  "Other",
] as const;

export const EMBROIDERY_PLACEMENTS = ["Back", "Chest", "Sleeve", "Other"] as const;

export const LABEL_OPTIONS = ["No", "Yes", "Not sure"] as const;

export const SAMPLE_OPTIONS = [
  "Yes, sample first",
  "No, straight to production",
  "Not sure",
] as const;

export const DELIVERY_OPTIONS = [
  "As soon as possible",
  "Within 2 months",
  "2 to 4 months",
  "Flexible",
] as const;

export const HEARD_ABOUT_OPTIONS = [
  "Google search",
  "Instagram",
  "WhatsApp",
  "Referral",
  "Other",
] as const;

export const GENERAL_INQUIRY = "General question";

export function isGeneralInquiry(value: string) {
  return value === GENERAL_INQUIRY;
}
