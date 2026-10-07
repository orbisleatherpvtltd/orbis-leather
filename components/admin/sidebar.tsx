"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin/dashboard" }],
  },
  {
    label: "Content",
    items: [
      { label: "Products", href: "/admin/products" },
      { label: "Blog", href: "/admin/blog" },
      { label: "FAQ", href: "/admin/faq" },
      { label: "Testimonials", href: "/admin/testimonials" },
    ],
  },
  {
    label: "Sales",
    items: [{ label: "Inquiries", href: "/admin/inquiries" }],
  },
  {
    label: "System",
    items: [{ label: "Settings", href: "/admin/settings" }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col bg-ink text-paper">
      <div className="border-b border-paper/10 px-5 py-5">
        <span className="text-body-lg font-bold tracking-tight">ORBIS</span>
        <span className="ml-1.5 text-caption uppercase tracking-widest text-paper/50">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-2 px-2 text-eyebrow uppercase tracking-[0.16em] text-paper/40">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-2.5 py-2 text-body-sm transition-colors",
                        active
                          ? "bg-leather text-paper font-medium"
                          : "text-paper/70 hover:bg-paper/10 hover:text-paper",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
