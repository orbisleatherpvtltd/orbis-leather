export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-screen bg-zinc-100">{children}</div>;
}
