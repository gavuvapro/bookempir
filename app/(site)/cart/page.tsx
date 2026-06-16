"use client"
import { useCart } from "@/lib/cart-store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  BookOpen,
  ShieldCheck,
} from "lucide-react"

export default function CartPage() {
  const { items, setQty, remove, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-500 mx-auto mb-6">
          <ShoppingBag size={36} />
        </div>
        <h1 className="font-display text-3xl mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added any books yet. Explore our collection and find your next great read.
        </p>
        <Link href="/books">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2 rounded-full px-6">
            <BookOpen size={16} />
            Browse Books
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* ── Header ────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-12 md:py-16">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
            <ShoppingBag size={16} />
            Shopping Cart
          </p>
          <h1 className="font-display text-4xl">
            Your Cart ({items.reduce((n, i) => n + i.qty, 0)} {items.reduce((n, i) => n + i.qty, 0) === 1 ? "item" : "items"})
          </h1>
        </div>
      </section>

      <section className="container py-10 pb-24">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── Items ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex gap-4 rounded-2xl border bg-card p-4 hover:shadow-sm transition-shadow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={i.coverImage}
                  className="w-20 h-28 object-cover rounded-xl bg-secondary flex-shrink-0"
                  alt=""
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/books/${i.slug}`}
                    className="font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-1"
                  >
                    {i.title}
                  </Link>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {formatPrice(i.price)}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => setQty(i.id, Math.max(1, i.qty - 1))}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {i.qty}
                    </span>
                    <button
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-medium text-sm">
                    {formatPrice(i.price * i.qty)}
                  </span>
                  <button
                    onClick={() => remove(i.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-muted-foreground hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Summary ───────────────────────────────── */}
          <div className="h-fit sticky top-24">
            <div className="rounded-[24px] border bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 dark:text-green-400 text-xs font-medium">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
              <Link href="/checkout">
                <Button
                  className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2"
                  size="lg"
                >
                  Checkout
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-3">
                <ShieldCheck size={12} />
                Secure checkout powered by Stripe
              </div>
            </div>
            <Link
              href="/books"
              className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mt-4 transition-colors"
            >
              <BookOpen size={14} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
