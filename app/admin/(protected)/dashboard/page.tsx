import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

const STATUS_BADGE: Record<string, BadgeVariant> = {
  NEW: "leather",
  CONTACTED: "ink",
  QUALIFIED: "ink",
  CLOSED: "outline",
  SPAM: "outline",
};

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-lg border border-ink/10 bg-white p-6 transition-colors hover:border-ink/30"
    >
      <span className="text-caption uppercase tracking-wide text-ink/60">{label}</span>
      <span className="text-h1 font-bold text-ink">{value}</span>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const [
    newInquiries,
    totalInquiries,
    publishedProducts,
    publishedPosts,
    faqCount,
    recentInquiries,
  ] = await Promise.all([
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count(),
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.faqItem.count(),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-h2 font-bold text-ink">Dashboard</h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-caption font-medium uppercase tracking-wide text-ink/60">
          Needs Attention
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard label="New Inquiries" value={newInquiries} href="/admin/inquiries?status=NEW" />
          <StatCard label="Total Inquiries" value={totalInquiries} href="/admin/inquiries" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-caption font-medium uppercase tracking-wide text-ink/60">Content</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Published Products" value={publishedProducts} href="/admin/products" />
          <StatCard label="Published Blog Posts" value={publishedPosts} href="/admin/blog" />
          <StatCard label="FAQ Items" value={faqCount} href="/admin/faq" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-caption font-medium uppercase tracking-wide text-ink/60">
            Recent Inquiries
          </h2>
          <Link href="/admin/inquiries" className="text-body-sm text-ink/60 hover:text-ink">
            View all
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-ink/10 bg-white">
          <table className="w-full text-left text-body-sm">
            <thead className="border-b border-ink/10 bg-zinc-50 text-caption uppercase tracking-wide text-ink/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">
                    {inquiry.name}
                    {inquiry.companyName ? ` — ${inquiry.companyName}` : ""}
                  </td>
                  <td className="px-4 py-3 text-ink/60">{inquiry.type}</td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_BADGE[inquiry.status]}>{inquiry.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-ink/60">{inquiry.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
              {recentInquiries.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-ink/60">
                    No inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
