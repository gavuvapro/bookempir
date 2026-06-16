import { db } from "@/lib/db"
import { notFound } from "next/navigation"
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await db.blogPost.findUnique({ where: { slug: resolvedParams.slug } })
  if(!post || !post.published) return notFound()
  return <article className="container py-16 prose-book max-w-3xl"><h1 className="font-display !mb-3">{post.title}</h1><div className="text-muted-foreground text-sm mb-8">{post.publishedAt?.toDateString()}</div><div dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g,"<br/>")}} /></article>
}
