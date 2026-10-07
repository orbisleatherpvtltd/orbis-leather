import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateTestimonial } from "@/lib/actions/testimonial";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function AdminEditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">Edit Testimonial</h1>
      <TestimonialForm
        action={updateTestimonial.bind(null, testimonial.id)}
        submitLabel="Save Changes"
        defaultValues={{
          companyName: testimonial.companyName,
          personName: testimonial.personName ?? "",
          role: testimonial.role ?? "",
          quote: testimonial.quote,
          logoUrl: testimonial.logoUrl ?? "",
          isPublished: testimonial.isPublished,
          sortOrder: testimonial.sortOrder,
        }}
      />
    </div>
  );
}
