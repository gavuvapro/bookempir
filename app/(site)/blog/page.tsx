import { db } from "@/lib/db"
import Link from "next/link"
import { PenLine, Calendar, ArrowRight } from "lucide-react"

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <PenLine size={16} />
            Blog
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            Thoughts & Insights
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Essays, book notes, and reflections on creativity, design, and the art of meaningful reading.
          </p>
        </div>
      </section>

      {/* ── Posts ──────────────────────────────────────── */}
      <section className="container py-16 md:py-20">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group block rounded-2xl border bg-card p-6 md:p-8 hover:shadow-md transition-all hover:border-amber-300 dark:hover:border-amber-700"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar size={12} />
                  {p.publishedAt?.toDateString()}
                </div>
                <h2 className="font-display text-2xl group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {p.title}
                </h2>
                <p className="text-muted-foreground mt-3 line-clamp-3">
                  {p.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 mt-4 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <PenLine size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No posts yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Check back soon for new articles and insights.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
