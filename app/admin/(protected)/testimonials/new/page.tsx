import { createTestimonial } from "@/lib/actions/testimonial";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function AdminNewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">New Testimonial</h1>
      <TestimonialForm
        action={createTestimonial}
        submitLabel="Create Testimonial"
        defaultValues={{
          companyName: "",
          personName: "",
          role: "",
          quote: "",
          logoUrl: "",
          isPublished: false,
          sortOrder: 0,
        }}
      />
    </div>
  );
}
