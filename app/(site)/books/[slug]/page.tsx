import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { AddToCart } from "@/components/site/add-to-cart"
import { BookCard } from "@/components/site/book-card"
import { ReviewForm } from "@/components/site/review-form"
import { WishlistButton } from "@/components/site/wishlist-button"
import {
  Star,
  BookOpen,
  Package,
  Globe,
  FileText,
  ExternalLink,
  MessageSquare,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const book = await db.book.findUnique({ where: { slug: params.slug } })
  return { title: book?.title || "Book" }
}

export default async function BookPage({ params }: { params: { slug: string } }) {
  const book = await db.book.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      reviews: { where: { approved: true }, include: { user: true } },
    },
  })
  if (!book) return notFound()

  const related = await db.book.findMany({
    where: { categoryId: book.categoryId, id: { not: book.id } },
    take: 4,
  })

  const avg = book.reviews.length
    ? (book.reviews.reduce((a, r) => a + r.rating, 0) / book.reviews.length).toFixed(1)
    : null

  return (
    <div>
      {/* ── Breadcrumb ────────────────────────────────── */}
      <div className="container pt-6">
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Books
        </Link>
      </div>

      {/* ── Product ───────────────────────────────────── */}
      <section className="container py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {/* Cover */}
          <div className="rounded-[32px] border bg-secondary overflow-hidden aspect-[3/4] shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <Link
              href={`/books?category=${book.category.slug}`}
              className="text-sm text-amber-600 dark:text-amber-400 font-medium hover:underline"
            >
              {book.category.name}
            </Link>

            <h1 className="font-display text-3xl md:text-4xl mt-2">
              {book.title}
            </h1>

            {/* Rating */}
            {avg && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(Number(avg))
                          ? "fill-amber-500"
                          : "fill-none"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {avg} ({book.reviews.length}{" "}
                  {book.reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-display">
                {formatPrice(book.price)}
              </span>
              {book.comparePrice && (
                <span className="text-muted-foreground line-through text-base">
                  {formatPrice(book.comparePrice)}
                </span>
              )}
              {book.comparePrice && (
                <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Save{" "}
                  {Math.round(
                    ((book.comparePrice - book.price) / book.comparePrice) * 100
                  )}
                  %
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${
                  book.stock > 0
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}
              >
                <Package size={14} />
                {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-muted-foreground leading-relaxed flex-1">
              {book.description}
            </p>

            {/* Meta info */}
            <div className="grid grid-cols-3 gap-4 mt-6 py-4 border-t border-b">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <FileText size={14} />
                </div>
                <div className="text-sm font-medium">{book.pages || "—"}</div>
                <div className="text-xs text-muted-foreground">Pages</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Globe size={14} />
                </div>
                <div className="text-sm font-medium">{book.language}</div>
                <div className="text-xs text-muted-foreground">Language</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <BookOpen size={14} />
                </div>
                <div className="text-sm font-medium truncate">
                  {book.isbn || "—"}
                </div>
                <div className="text-xs text-muted-foreground">ISBN</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <AddToCart
                book={{
                  id: book.id,
                  title: book.title,
                  price: book.price,
                  coverImage: book.coverImage,
                  slug: book.slug,
                }}
              />
              <WishlistButton bookId={book.id} />
            </div>

            {book.previewUrl && (
              <a
                href={book.previewUrl}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:underline mt-4"
              >
                <ExternalLink size={14} />
                Preview sample pages
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────── */}
      <section className="container pb-16">
        <div className="border-t pt-10">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare size={20} className="text-amber-500" />
            <h3 className="font-display text-2xl">
              Reviews{" "}
              {book.reviews.length > 0 && (
                <span className="text-muted-foreground text-base font-normal">
                  ({book.reviews.length})
                </span>
              )}
            </h3>
          </div>

          {book.reviews.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center">
              <MessageSquare
                size={32}
                className="mx-auto text-muted-foreground/30 mb-3"
              />
              <p className="text-muted-foreground">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {book.reviews.map((r) => (
                <div key={r.id} className="rounded-2xl border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < r.rating
                                ? "fill-amber-500"
                                : "fill-none text-muted-foreground"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">
                        {r.user.name || "Reader"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <ReviewForm bookId={book.id} />
          </div>
        </div>
      </section>

      {/* ── Related ───────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-secondary/60 dark:bg-secondary/30 py-16">
          <div className="container">
            <h3 className="font-display text-2xl mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-amber-500" />
              Related Books
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((b) => (
                <BookCard
                  key={b.id}
                  book={{ ...b, category: book.category }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
