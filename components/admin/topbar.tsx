import { logout } from "@/lib/actions/auth";
import type { CurrentAdmin } from "@/lib/auth/require-admin";

export function AdminTopbar({ admin }: { admin: CurrentAdmin }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink/10 bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-body-sm font-medium text-ink">{admin.name}</p>
          <p className="text-caption text-ink/60">{admin.email}</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md border border-ink/15 px-3 py-1.5 text-body-sm text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
          >
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
