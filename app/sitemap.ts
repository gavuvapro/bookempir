import { MetadataRoute } from "next"
import { db } from "@/lib/db"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const books = await db.book.findMany({ where:{ published:true }})
  const posts = await db.blogPost.findMany({ where:{ published:true }})
  return [
    { url: base, lastModified: new Date() },
    { url: base+"/books" },
    ...books.map(b=>({ url: `${base}/books/${b.slug}`, lastModified: b.updatedAt })),
    ...posts.map(p=>({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ]
}
