import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar admin={admin} />
        <main className="flex-1 overflow-y-auto bg-zinc-50 p-6">{children}</main>
      </div>
    </div>
  );
}
