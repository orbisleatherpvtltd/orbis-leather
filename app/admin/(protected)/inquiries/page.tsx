import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Select } from "@/components/ui/form/select";
import { Textarea } from "@/components/ui/form/textarea";
import { Button } from "@/components/ui/button";
import { updateInquiryStatus, updateInquiryNotes } from "@/lib/actions/inquiry";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"] as const;
const TYPE_OPTIONS = ["QUOTE", "CONTACT"] as const;

const STATUS_BADGE: Record<(typeof STATUS_OPTIONS)[number], BadgeVariant> = {
  NEW: "leather",
  CONTACTED: "ink",
  QUALIFIED: "ink",
  CLOSED: "outline",
  SPAM: "outline",
};

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const { status, type } = await searchParams;

  const inquiries = await prisma.inquiry.findMany({
    where: {
      status: status && STATUS_OPTIONS.includes(status as (typeof STATUS_OPTIONS)[number])
        ? (status as (typeof STATUS_OPTIONS)[number])
        : undefined,
      type: type && TYPE_OPTIONS.includes(type as (typeof TYPE_OPTIONS)[number])
        ? (type as (typeof TYPE_OPTIONS)[number])
        : undefined,
    },
    orderBy: { createdAt: "desc" },
  });

  function filterHref(next: { status?: string; type?: string }) {
    const params = new URLSearchParams();
    const nextStatus = next.status !== undefined ? next.status : status;
    const nextType = next.type !== undefined ? next.type : type;
    if (nextStatus) params.set("status", nextStatus);
    if (nextType) params.set("type", nextType);
    const query = params.toString();
    return query ? `/admin/inquiries?${query}` : "/admin/inquiries";
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">Inquiries</h1>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Link
            href={filterHref({ status: "" })}
            className={cn(
              "rounded-full border px-3 py-1 text-body-sm",
              !status ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/60 hover:text-ink",
            )}
          >
            All statuses
          </Link>
          {STATUS_OPTIONS.map((option) => (
            <Link
              key={option}
              href={filterHref({ status: option })}
              className={cn(
                "rounded-full border px-3 py-1 text-body-sm",
                status === option
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink/60 hover:text-ink",
              )}
            >
              {option}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={filterHref({ type: "" })}
            className={cn(
              "rounded-full border px-3 py-1 text-body-sm",
              !type ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/60 hover:text-ink",
            )}
          >
            All types
          </Link>
          {TYPE_OPTIONS.map((option) => (
            <Link
              key={option}
              href={filterHref({ type: option })}
              className={cn(
                "rounded-full border px-3 py-1 text-body-sm",
                type === option
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink/60 hover:text-ink",
              )}
            >
              {option}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {inquiries.map((inquiry) => (
          <details key={inquiry.id} className="rounded-lg border border-ink/10 bg-white p-6">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="font-medium text-ink">
                  {inquiry.name}
                  {inquiry.companyName ? ` — ${inquiry.companyName}` : ""}
                </span>
                <span className="text-body-sm text-ink/60">
                  {inquiry.email} · {inquiry.type} · {inquiry.createdAt.toLocaleDateString()}
                </span>
              </div>
              <Badge variant={STATUS_BADGE[inquiry.status]}>{inquiry.status}</Badge>
            </summary>

            <div className="mt-6 flex flex-col gap-6 border-t border-ink/10 pt-6">
              <dl className="grid gap-4 text-body-sm sm:grid-cols-2">
                <div>
                  <dt className="text-caption uppercase tracking-wide text-ink/60">Country</dt>
                  <dd className="text-ink">{inquiry.country ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-wide text-ink/60">Phone</dt>
                  <dd className="text-ink">{inquiry.phone ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-wide text-ink/60">Product Interest</dt>
                  <dd className="text-ink">{inquiry.productInterest ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-wide text-ink/60">Quantity Estimate</dt>
                  <dd className="text-ink">{inquiry.quantityEstimate ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-wide text-ink/60">Submitted</dt>
                  <dd className="text-ink">{inquiry.createdAt.toLocaleString()}</dd>
                </div>
                {inquiry.updatedAt.getTime() !== inquiry.createdAt.getTime() && (
                  <div>
                    <dt className="text-caption uppercase tracking-wide text-ink/60">Last Updated</dt>
                    <dd className="text-ink">{inquiry.updatedAt.toLocaleString()}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-caption uppercase tracking-wide text-ink/60">IP Address</dt>
                  <dd className="text-ink">{inquiry.ipAddress ?? "—"}</dd>
                </div>
              </dl>

              <div>
                <p className="mb-1 text-caption uppercase tracking-wide text-ink/60">Message</p>
                <p className="whitespace-pre-wrap text-body text-ink/80">{inquiry.message}</p>
              </div>

              <form
                action={updateInquiryStatus.bind(null, inquiry.id)}
                className="flex flex-wrap items-end gap-3"
              >
                <label className="flex flex-col gap-1 text-body-sm text-ink/70">
                  Status
                  <Select name="status" defaultValue={inquiry.status} className="w-48">
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </label>
                <Button type="submit" variant="outline" size="sm">
                  Update Status
                </Button>
              </form>

              <form action={updateInquiryNotes.bind(null, inquiry.id)} className="flex flex-col gap-2">
                <label htmlFor={`notes-${inquiry.id}`} className="text-body-sm text-ink/70">
                  Internal Notes
                </label>
                <Textarea
                  id={`notes-${inquiry.id}`}
                  name="internalNotes"
                  defaultValue={inquiry.internalNotes ?? ""}
                  rows={3}
                />
                <Button type="submit" variant="outline" size="sm" className="w-fit">
                  Save Notes
                </Button>
              </form>
            </div>
          </details>
        ))}
        {inquiries.length === 0 && (
          <p className="rounded-lg border border-dashed border-ink/20 p-8 text-center text-ink/60">
            No inquiries match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
