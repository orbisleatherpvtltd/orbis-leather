export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "moq",
    question: "What is your minimum order quantity (MOQ)?",
    answer:
      "Our MOQ is 5 pieces per style. This applies to startups and small brands as well as larger buyers. If you need a bigger run, send us your quantity and we will quote it.",
  },
  {
    id: "sampling",
    question: "Can we get samples before placing a bulk order?",
    answer:
      "Yes. We can make a sample so you can check the fit, leather and finish before production starts. Send us your design or reference and we will confirm the sample fee and timing in your quote.",
  },
  {
    id: "lead-time",
    question: "What is your production lead time?",
    answer:
      "It depends on the style, the leather, the quantity and whether the jacket has custom embroidery. We confirm the lead time in your quote, after we have reviewed your design and quantity.",
  },
  {
    id: "shipping",
    question: "What shipping options are available?",
    answer:
      "We ship from Karachi, Pakistan. The shipping method and cost depend on the destination, the size of the order and the courier or freight forwarder you prefer. We confirm these in your quote.",
  },
  {
    id: "incoterms",
    question: "Which Incoterms do you work with?",
    answer:
      "Incoterms are agreed per order. Tell us the term you prefer when you request a quote, and we will confirm what we can offer for your destination.",
  },
  {
    id: "payment-terms",
    question: "What are your payment terms?",
    answer:
      "Payment terms depend on the order size. Smaller orders need a higher advance. On larger orders, part of the payment is made in advance and the balance is paid before dispatch. Send us your quantity and we will confirm the exact terms in your quote.",
  },
  {
    id: "customization",
    question: "Can products be customized or private labeled?",
    answer:
      "Yes. We make leather jackets to your design and specifications, including private label orders. We also make custom embroidery jackets, with the embroidery done directly on genuine leather. Send us your artwork and requirements through Request Quote.",
  },
  {
    id: "minimum-order-value",
    question: "Is there a minimum order value?",
    answer:
      "Our minimum is set by quantity, not by value: 5 pieces per style. Request a quote and we will confirm the total for your order.",
  },
  {
    id: "startups",
    question: "Can startups and small brands order from you?",
    answer:
      "Yes. With a minimum of 5 pieces per style, you can test your designs in a small batch before you scale up.",
  },
  {
    id: "embroidery",
    question: "Do you make custom embroidery jackets?",
    answer:
      "Yes. We embroider your artwork directly on genuine leather jackets, not on patches. Send us your artwork, where you want it placed and your quantity, and we will confirm the details in your quote.",
  },
  {
    id: "location",
    question: "Where are you located?",
    answer: "We are based in Karachi, Pakistan. We have been making leather jackets since 2001.",
  },
  {
    id: "request-quote",
    question: "How do I request a quote?",
    answer:
      "Use the Request Quote button and tell us the style, quantity and design. You can also message us on WhatsApp at +92 333-4544557 or email inquiry@orbisleatherpvtltd.com.",
  },
];
