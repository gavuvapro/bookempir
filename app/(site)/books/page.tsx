import { db } from "@/lib/db"
import { BookCard } from "@/components/site/book-card"
import Link from "next/link"
import { BookOpen, Search, SlidersHorizontal, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function BooksPage({ searchParams }: { searchParams: { q?:string, category?:string, sort?:string, page?:string }}) {
  const q = searchParams.q || ""
  const categorySlug = searchParams.category
  const page = parseInt(searchParams.page || "1")
  const take = 12
  const where: any = { published: true, title: q? { contains: q, mode: "insensitive"}:undefined, category: categorySlug ? { slug: categorySlug } : undefined }
  const orderBy = searchParams.sort === "price_asc" ? { price: "asc" as const } : searchParams.sort === "price_desc" ? { price: "desc" as const } : { createdAt: "desc" as const}
  const [books, total, categories] = await Promise.all([
    db.book.findMany({ where, orderBy, skip: (page-1)*take, take, include:{ category:true }}),
    db.book.count({ where }),
    db.category.findMany()
  ])
  const totalPages = Math.ceil(total / take)

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <BookOpen size={16} />
            Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            {categorySlug ? `${categories.find(c => c.slug === categorySlug)?.name || "Books"}` : q ? `Results for "${q}"` : "All Books"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {total} {total === 1 ? "book" : "books"} {categorySlug ? "in this category" : "in our collection"}
          </p>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────── */}
      <section className="container py-8">
        <form className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search books…"
              className="border rounded-full pl-10 pr-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow w-56"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select
              name="category"
              defaultValue={categorySlug || ""}
              className="border rounded-full pl-9 pr-4 py-2.5 text-sm bg-background appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow"
            >
              <option value="">All categories</option>
              {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <select
            name="sort"
            defaultValue={searchParams.sort || ""}
            className="border rounded-full px-4 py-2.5 text-sm bg-background appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
          <Button type="submit" variant="secondary" size="sm" className="rounded-full px-5">
            Apply
          </Button>
        </form>
      </section>

      {/* ── Grid ──────────────────────────────────────── */}
      <section className="container pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map(b => <BookCard key={b.id} book={b} />)}
        </div>
        {books.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No books found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms.</p>
            <Link href="/books">
              <Button variant="outline" className="mt-4 rounded-full">
                Clear Filters
              </Button>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            {page > 1 && (
              <Link
                href={`/books?page=${page - 1}${categorySlug ? `&category=${categorySlug}` : ""}${searchParams.sort ? `&sort=${searchParams.sort}` : ""}${q ? `&q=${q}` : ""}`}
                className="inline-flex items-center gap-1.5 text-sm rounded-full border px-4 py-2 hover:bg-accent transition-colors"
              >
                <ArrowLeft size={14} />
                Previous
              </Link>
            )}
            <span className="text-sm text-muted-foreground px-3">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/books?page=${page + 1}${categorySlug ? `&category=${categorySlug}` : ""}${searchParams.sort ? `&sort=${searchParams.sort}` : ""}${q ? `&q=${q}` : ""}`}
                className="inline-flex items-center gap-1.5 text-sm rounded-full border px-4 py-2 hover:bg-accent transition-colors"
              >
                Next
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
