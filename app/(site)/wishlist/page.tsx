import { requireUser } from "@/lib/auth-utils"
import { db } from "@/lib/db"
import Link from "next/link"
export default async function Wishlist(){
  const session = await requireUser()
  const items = await db.wishlistItem.findMany({ where:{ userId: (session.user as any).id }, include:{ book:true }})
  return <div className="container py-16"><h1 className="font-display text-3xl mb-6">Wishlist</h1>{items.length===0 ? <p className="text-muted-foreground">Empty.</p> : <div className="grid sm:grid-cols-3 gap-6">{items.map(w=> <Link key={w.id} href={`/books/${w.book.slug}`} className="border rounded-2xl p-4">{w.book.title}</Link>)}</div>}</div>
}
