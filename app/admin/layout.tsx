import { requireAdmin } from "@/lib/auth-utils"
import Link from "next/link"
export default async function AdminLayout({ children }:{ children:React.ReactNode }){
  await requireAdmin()
  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="border-r bg-card p-6">
        <div className="font-display text-xl mb-6">Authora CMS</div>
        <nav className="space-y-3 text-sm">
          <Link className="block" href="/admin">Dashboard</Link>
          <Link className="block" href="/admin/books">Books</Link>
          <Link className="block" href="/admin/orders">Orders</Link>
          <Link className="block" href="/admin/blog">Blog</Link>
          <Link className="block" href="/admin/reviews">Reviews</Link>
          <Link className="block" href="/admin/coupons">Coupons</Link>
          <Link className="block pt-4 text-muted-foreground" href="/">← Back to site</Link>
        </nav>
      </aside>
      <main className="p-8 bg-secondary/40">{children}</main>
    </div>
  )
}
