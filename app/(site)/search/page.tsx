import { db } from "@/lib/db"
import { BookCard } from "@/components/site/book-card"
import Link from "next/link"
import { Search as SearchIcon, BookOpen, PenLine } from "lucide-react"

export default async function Search({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q || ""
  const books = q
    ? await db.book.findMany({
        where: { title: { contains: q, mode: "insensitive" }, published: true },
        include: { category: true },
      })
    : []
  const posts = q
    ? await db.blogPost.findMany({
        where: { title: { contains: q, mode: "insensitive" }, published: true },
      })
    : []

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <SearchIcon size={16} />
            Search
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            {q ? `Results for "${q}"` : "Search BookEmpir"}
          </h1>
          {q && (
            <p className="mt-3 text-muted-foreground">
              Found {books.length} {books.length === 1 ? "book" : "books"} and {posts.length}{" "}
              {posts.length === 1 ? "article" : "articles"}
            </p>
          )}
        </div>
      </section>

      {/* ── Search Form ───────────────────────────────── */}
      <section className="container py-8">
        <form className="max-w-lg">
          <div className="relative">
            <SearchIcon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search books, articles…"
              className="border rounded-full pl-11 pr-4 py-3 w-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow"
            />
          </div>
        </form>
      </section>

      {/* ── Results ───────────────────────────────────── */}
      <section className="container pb-20">
        {/* Books */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 font-display text-xl mb-5">
            <BookOpen size={18} className="text-amber-500" />
            Books
          </h2>
          {books.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          ) : (
            q && (
              <div className="rounded-2xl border bg-card p-8 text-center">
                <BookOpen size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground text-sm">No books match your search.</p>
              </div>
            )
          )}
        </div>

        {/* Articles */}
        <div>
          <h2 className="flex items-center gap-2 font-display text-xl mb-5">
            <PenLine size={18} className="text-amber-500" />
            Articles
          </h2>
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border bg-card p-5 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-all"
                >
                  <span className="font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            q && (
              <div className="rounded-2xl border bg-card p-8 text-center">
                <PenLine size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground text-sm">No articles match your search.</p>
              </div>
            )
          )}
        </div>

        {/* No query state */}
        {!q && (
          <div className="text-center py-12">
            <SearchIcon size={48} className="mx-auto text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground">Type a search term to find books and articles.</p>
          </div>
        )}
      </section>
    </div>
  )
}
