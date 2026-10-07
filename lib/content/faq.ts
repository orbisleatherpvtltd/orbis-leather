export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Placeholder content pending confirmed business terms. Update once MOQ,
 * lead-time, and Incoterms policies are finalized.
 */
export const faqEntries: FaqEntry[] = [
  {
    id: "moq",
    question: "What is your minimum order quantity (MOQ)?",
    answer:
      "MOQ varies by product, materials, and customization level. Share your project details via Request Quote and we'll confirm an MOQ for your specific order.",
  },
  {
    id: "sampling",
    question: "Can we get samples before placing a bulk order?",
    answer:
      "Yes. Sampling is available for most product lines. Sample lead time, cost, and shipping terms depend on the design and materials involved and will be confirmed during your inquiry.",
  },
  {
    id: "lead-time",
    question: "What is your production lead time?",
    answer:
      "Lead time depends on order volume, customization, and current production capacity. We'll provide a specific estimate once we understand your order requirements.",
  },
  {
    id: "shipping",
    question: "What shipping options are available?",
    answer:
      "We support standard international freight options for B2B orders. Available carriers, modes (air/sea), and estimated transit times are confirmed at the quote stage based on destination and order size.",
  },
  {
    id: "incoterms",
    question: "Which Incoterms do you work with?",
    answer:
      "We can accommodate common international commercial terms (e.g., FOB, EXW, CIF) depending on the order and destination. Exact terms are agreed upon during quoting.",
  },
  {
    id: "payment-terms",
    question: "What are your payment terms?",
    answer:
      "Payment terms are discussed and confirmed per order, typically structured around a deposit and balance arrangement. Final terms will be outlined in your quote.",
  },
  {
    id: "customization",
    question: "Can products be customized or private labeled?",
    answer:
      "Yes. We support OEM and private label programs, including custom branding, hardware, linings, and sizing. See our Capabilities page for details, or tell us your requirements in a quote request.",
  },
  {
    id: "minimum-order-value",
    question: "Is there a minimum order value?",
    answer:
      "Minimum order value depends on the product mix and customization involved. Contact us with your project details and we'll confirm what applies to your order.",
  },
];
