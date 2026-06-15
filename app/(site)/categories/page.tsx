import { db } from "@/lib/db"
import Link from "next/link"
export default async function Categories(){
  const cats = await db.category.findMany({ include:{ _count:{ select:{ books:true } }}})
  return <div className="container py-16"><h1 className="font-display text-4xl mb-8">Categories</h1><div className="grid sm:grid-cols-3 gap-6">{cats.map(c=> <Link key={c.id} href={`/books?category=${c.slug}`} className="border rounded-[24px] p-6 bg-card hover:shadow-sm transition"><div className="text-xl font-display">{c.name}</div><div className="text-sm text-muted-foreground mt-1">{c._count.books} books</div></Link>)}</div></div>
}
