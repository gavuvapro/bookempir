import Link from "next/link"
import { formatPrice } from "@/lib/utils"

export function BookCard({ book }: { book: any }) {
  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <div className="aspect-[3/4] rounded-[24px] bg-secondary overflow-hidden border hover:shadow-lg transition-shadow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="pt-4">
        <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
          {book.category?.name}
        </div>
        <div className="font-medium mt-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
          {book.title}
        </div>
        <div className="text-sm mt-1 font-display">{formatPrice(book.price)}</div>
      </div>
    </Link>
  )
}
