import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
export default async function AdminReviews(){
  const reviews = await db.review.findMany({ include:{ book:true, user:true }, orderBy:{ createdAt:"desc"}})
  async function approve(id: string){ "use server"; await db.review.update({ where:{ id }, data:{ approved:true }}); revalidatePath("/admin/reviews") }
  return <div><h1 className="font-display text-3xl mb-6">Review moderation</h1>
  <div className="space-y-3">{reviews.map(r=> <div key={r.id} className="bg-card border rounded-2xl p-4"><div className="text-sm">{r.book.title} — {r.rating}★ by {r.user.email} {r.approved ? "✓ approved" : ""}</div><p className="mt-1">{r.comment}</p>{!r.approved && <form action={approve.bind(null, r.id)}><button className="text-xs underline mt-2">Approve</button></form>}</div>)}</div></div>
}
