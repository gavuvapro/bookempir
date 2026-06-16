import { requireUser } from "@/lib/auth-utils"
import { db } from "@/lib/db"
import Link from "next/link"
import {
  User,
  Package,
  Heart,
  BookOpen,
  LogOut,
  ShoppingBag,
} from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default async function Account() {
  const session = await requireUser()
  const orders = await db.order.findMany({
    where: { email: session.user.email! },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    SHIPPED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <div>
      {/* ── Header ────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-12 md:py-16">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <User size={28} />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl">
                Hi, {session.user.name || "reader"}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10 pb-24">
        {/* ── Quick Actions ───────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Link
            href="/books"
            className="group rounded-2xl border bg-card p-5 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <BookOpen size={18} />
            </div>
            <span className="font-medium text-sm">Browse Books</span>
          </Link>
          <Link
            href="/wishlist"
            className="group rounded-2xl border bg-card p-5 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Heart size={18} />
            </div>
            <span className="font-medium text-sm">Wishlist</span>
          </Link>
          <Link
            href="/cart"
            className="group rounded-2xl border bg-card p-5 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <ShoppingBag size={18} />
            </div>
            <span className="font-medium text-sm">Shopping Cart</span>
          </Link>
        </div>

        {/* ── Orders ──────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-5">
          <Package size={20} className="text-amber-500" />
          <h2 className="font-display text-2xl">Recent Orders</h2>
        </div>

        <div className="rounded-2xl border bg-card overflow-hidden">
          {orders.length > 0 ? (
            <div className="divide-y">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Package size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">
                        {o.orderNumber}
                      </span>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {o.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        statusColors[o.status] ||
                        "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {o.status}
                    </span>
                    <span className="font-medium text-sm">
                      {formatPrice(o.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <Package
                size={36}
                className="mx-auto text-muted-foreground/30 mb-3"
              />
              <p className="text-muted-foreground">No orders yet</p>
              <Link
                href="/books"
                className="text-sm text-amber-600 dark:text-amber-400 underline mt-1 inline-block"
              >
                Start shopping →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
