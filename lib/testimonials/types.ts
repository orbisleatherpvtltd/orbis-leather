export type Testimonial = {
  id: string;
  companyName: string;
  personName?: string;
  role?: string;
  quote: string;
  logoUrl?: string;
  sortOrder: number;
};
