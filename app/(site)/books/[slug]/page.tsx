import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { AddToCart } from "@/components/site/add-to-cart"
import { BookCard } from "@/components/site/book-card"
import { ReviewForm } from "@/components/site/review-form"
import { WishlistButton } from "@/components/site/wishlist-button"
export async function generateMetadata({ params }: { params: { slug: string }}) {
  const book = await db.book.findUnique({ where: { slug: params.slug }})
  return { title: book?.title || "Book" }
}
export default async function BookPage({ params }: { params: { slug: string }}) {
  const book = await db.book.findUnique({ where: { slug: params.slug }, include: { category: true, reviews: { where: { approved: true }, include: { user: true }}}})
  if (!book) return notFound()
  const related = await db.book.findMany({ where: { categoryId: book.categoryId, id: { not: book.id }}, take: 4 })
  const avg = book.reviews.length ? (book.reviews.reduce((a,r)=>a+r.rating,0)/book.reviews.length).toFixed(1) : null
  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-14">
        <div className="rounded-[32px] border bg-secondary overflow-hidden aspect-[3/4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover"/>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">{book.category.name}</div>
          <h1 className="font-display text-4xl mt-2">{book.title}</h1>
          <div className="mt-3 text-xl">{formatPrice(book.price)} {book.comparePrice && <span className="text-muted-foreground line-through text-base ml-2">{formatPrice(book.comparePrice)}</span>}</div>
          <div className="text-sm text-muted-foreground mt-2">{book.stock>0? `${book.stock} in stock` : "Out of stock"} {avg && ` • ${avg}★ (${book.reviews.length})`}</div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{book.description}</p>
          <div className="mt-6 text-sm text-muted-foreground">ISBN: {book.isbn || "—"} • {book.pages || "?"} pages • {book.language}</div>
          <div className="mt-8 flex gap-3 flex-wrap">
            <AddToCart book={{ id: book.id, title: book.title, price: book.price, coverImage: book.coverImage, slug: book.slug }} />
            <WishlistButton bookId={book.id} />
          </div>
          {book.previewUrl && <a href={book.previewUrl} target="_blank" className="text-sm underline mt-4 inline-block">Preview sample pages →</a>}
        </div>
      </div>
      <div className="mt-16 border-t pt-10">
        <h3 className="font-display text-2xl mb-4">Reviews</h3>
        {book.reviews.length===0 ? <p className="text-muted-foreground text-sm">No reviews yet.</p> :
          <div className="space-y-4">{book.reviews.map(r=> <div key={r.id} className="border rounded-2xl p-4"><div className="font-medium">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)} <span className="text-muted-foreground text-sm ml-2">{r.user.name || "Reader"}</span></div><p className="text-sm mt-2">{r.comment}</p></div>)}</div>}
        <ReviewForm bookId={book.id} />
      </div>
      {related.length>0 && <div className="mt-20"><h3 className="font-display text-2xl mb-4">Related books</h3><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{related.map(b=> <BookCard key={b.id} book={{...b, category: book.category}} />)}</div></div>}
    </div>
  )
}
