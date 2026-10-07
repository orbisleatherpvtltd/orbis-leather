import Link from "next/link";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTestimonial, toggleTestimonialPublished } from "@/lib/actions/testimonial";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-bold text-ink">Testimonials</h1>
        <ButtonLink href="/admin/testimonials/new" variant="primary">
          New Testimonial
        </ButtonLink>
      </div>

      <div className="overflow-x-auto rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-body-sm">
          <thead className="border-b border-ink/10 bg-zinc-50 text-caption uppercase tracking-wide text-ink/60">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Person</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{testimonial.companyName}</td>
                <td className="px-4 py-3 text-ink/60">
                  {testimonial.personName ?? "—"}
                  {testimonial.role ? `, ${testimonial.role}` : ""}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={testimonial.isPublished ? "ink" : "outline"}>
                    {testimonial.isPublished ? "Published" : "Hidden"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <form
                      action={toggleTestimonialPublished.bind(
                        null,
                        testimonial.id,
                        !testimonial.isPublished,
                      )}
                    >
                      <button type="submit" className="text-body-sm text-ink/60 hover:text-ink">
                        {testimonial.isPublished ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/testimonials/${testimonial.id}`}
                      className="text-body-sm text-ink/60 hover:text-ink"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteTestimonial.bind(null, testimonial.id)}
                      confirmText={`Delete the testimonial from "${testimonial.companyName}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink/60">
                  No testimonials yet. Add real client feedback — no placeholder quotes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
