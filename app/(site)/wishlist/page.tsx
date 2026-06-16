import { requireUser } from "@/lib/auth-utils"
import { db } from "@/lib/db"
import Link from "next/link"
import { Heart, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function Wishlist() {
  const session = await requireUser()
  const items = await db.wishlistItem.findMany({
    where: { userId: (session.user as any).id },
    include: { book: { include: { category: true } } },
  })

  return (
    <div>
      {/* ── Header ────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-12 md:py-16">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
            <Heart size={16} />
            Saved Items
          </p>
          <h1 className="font-display text-4xl">Your Wishlist</h1>
          {items.length > 0 && (
            <p className="text-muted-foreground mt-2">
              {items.length} {items.length === 1 ? "book" : "books"} saved
            </p>
          )}
        </div>
      </section>

      <section className="container py-10 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-500 mx-auto mb-6">
              <Heart size={36} />
            </div>
            <h2 className="font-display text-2xl mb-3">No saved books yet</h2>
            <p className="text-muted-foreground mb-6">
              Browse our collection and tap the heart icon on any book to save it here for later.
            </p>
            <Link href="/books">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2 rounded-full px-6">
                <BookOpen size={16} />
                Browse Books
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((w) => (
              <Link
                key={w.id}
                href={`/books/${w.book.slug}`}
                className="group rounded-2xl border bg-card p-5 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all flex items-center gap-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.book.coverImage}
                  alt={w.book.title}
                  className="w-16 h-20 object-cover rounded-xl bg-secondary flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">
                    {w.book.category?.name}
                  </div>
                  <div className="font-medium mt-0.5 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {w.book.title}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 mt-2">
                    View book
                    <ArrowRight size={12} />
                  </span>
                </div>
                <Heart
                  size={18}
                  className="text-red-400 fill-red-400 flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
