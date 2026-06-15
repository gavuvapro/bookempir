import { db } from "@/lib/db"
import Link from "next/link"
export default async function BlogPage(){
  const posts = await db.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc"}})
  return <div className="container py-16"><h1 className="font-display text-4xl mb-8">Journal</h1><div className="grid md:grid-cols-2 gap-10">{posts.map(p=> <Link key={p.id} href={`/blog/${p.slug}`} className="block group"><div className="text-sm text-muted-foreground">{p.publishedAt?.toDateString()}</div><div className="text-2xl font-display mt-1 group-hover:text-primary">{p.title}</div><p className="text-muted-foreground mt-2">{p.excerpt}</p></Link>)}{posts.length===0 && <p className="text-muted-foreground">No posts yet.</p>}</div></div>
}
