import { db } from "@/lib/db"
import { BookCard } from "@/components/site/book-card"
import Link from "next/link"
export default async function Search({ searchParams }:{ searchParams:{ q?:string}}){
  const q = searchParams.q || ""
  const books = q ? await db.book.findMany({ where:{ title:{ contains:q, mode:"insensitive"}, published:true }, include:{ category:true }}) : []
  const posts = q ? await db.blogPost.findMany({ where:{ title:{ contains:q, mode:"insensitive"}, published:true }}) : []
  return <div className="container py-16"><h1 className="font-display text-3xl mb-6">Search {q && `“${q}”`}</h1>
  <form className="mb-8"><input name="q" defaultValue={q} placeholder="Search books, articles…" className="border rounded-full px-4 py-2 w-full max-w-md bg-background"/></form>
  <h2 className="font-medium mb-3">Books</h2>
  <div className="grid sm:grid-cols-3 gap-6 mb-10">{books.map(b=> <BookCard key={b.id} book={b} />)}{q && books.length===0 && <p className="text-muted-foreground text-sm">No books.</p>}</div>
  <h2 className="font-medium mb-3">Articles</h2>
  <ul className="space-y-2">{posts.map(p=> <li key={p.id}><Link href={`/blog/${p.slug}`} className="underline">{p.title}</Link></li>)}</ul>
  </div>
}
