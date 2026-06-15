import Link from "next/link"
import { formatPrice } from "@/lib/utils"
export function BookCard({ book }: { book: any }) {
  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <div className="aspect-[3/4] rounded-[24px] bg-secondary overflow-hidden border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" />
      </div>
      <div className="pt-4">
        <div className="text-xs text-muted-foreground">{book.category?.name}</div>
        <div className="font-medium mt-1">{book.title}</div>
        <div className="text-sm mt-1">{formatPrice(book.price)}</div>
      </div>
    </Link>
  )
}
