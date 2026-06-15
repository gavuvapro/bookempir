import { db } from "@/lib/db"
import Link from "next/link"
export default async function BlogAdmin(){ const posts = await db.blogPost.findMany({orderBy:{createdAt:"desc"}}); return <div><div className="flex justify-between mb-6"><h1 className="font-display text-3xl">Blog CMS</h1><Link href="/admin/blog/new" className="underline">New post</Link></div><ul className="space-y-2 bg-card border rounded-2xl p-4">{posts.map(p=> <li key={p.id}>{p.title} — {p.published ? "Published":"Draft"}</li>)}</ul></div>}
