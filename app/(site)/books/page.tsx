import { db } from "@/lib/db"
import { BookCard } from "@/components/site/book-card"
import Link from "next/link"

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
  return (
    <div className="container py-16">
      <h1 className="font-display text-4xl mb-6">All Books</h1>
      <form className="flex flex-wrap gap-3 mb-8">
        <input name="q" defaultValue={q} placeholder="Search books…" className="border rounded-full px-4 py-2 text-sm bg-background" />
        <select name="category" defaultValue={categorySlug||""} className="border rounded-full px-4 py-2 text-sm bg-background">
          <option value="">All categories</option>
          {categories.map(c=> <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
        <select name="sort" defaultValue={searchParams.sort||""} className="border rounded-full px-4 py-2 text-sm bg-background">
          <option value="newest">Newest</option>
          <option value="price_asc">Price low → high</option>
          <option value="price_desc">Price high → low</option>
        </select>
        <button className="text-sm px-4 py-2 rounded-full bg-secondary">Filter</button>
      </form>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map(b=> <BookCard key={b.id} book={b} />)}
      </div>
      {books.length===0 && <p className="text-muted-foreground">No books found.</p>}
      <div className="flex gap-2 mt-10">
        {page>1 && <Link className="text-sm underline" href={`/books?page=${page-1}`}>← Prev</Link>}
        {page * take < total && <Link className="text-sm underline" href={`/books?page=${page+1}`}>Next →</Link>}
      </div>
    </div>
  )
}
