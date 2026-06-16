import { db } from "@/lib/db"
import Link from "next/link"
import {
  LayoutGrid,
  BookOpen,
  ArrowRight,
  Palette,
  Lightbulb,
  Cpu,
  Brain,
  BookMarked,
  Trophy,
  Target,
  Users,
  Sparkles,
} from "lucide-react"

// Map category slugs to icons — fallback to BookOpen
const categoryIcons: Record<string, any> = {
  "design": Palette,
  "design-and-craft": Palette,
  "creative-living": Lightbulb,
  "creativity": Lightbulb,
  "technology": Cpu,
  "artificial-intelligence": Cpu,
  "ai": Cpu,
  "psychology": Brain,
  "philosophy": BookMarked,
  "sports": Trophy,
  "performance": Trophy,
  "strategic-living": Target,
  "strategy": Target,
  "society": Users,
  "culture": Users,
}

function getIconForCategory(slug: string) {
  // Try exact match first, then partial match
  if (categoryIcons[slug]) return categoryIcons[slug]
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (slug.includes(key) || key.includes(slug)) return icon
  }
  return Sparkles
}

export default async function Categories() {
  const cats = await db.category.findMany({
    include: { _count: { select: { books: true } } },
  })

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <LayoutGrid size={16} />
            Browse
          </p>
          <h1 className="font-display text-4xl md:text-5xl">Categories</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Explore our curated collection organized by subject. From design to philosophy, find books that match your interests.
          </p>
        </div>
      </section>

      {/* ── Categories Grid ───────────────────────────── */}
      <section className="container py-16 md:py-20">
        {cats.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cats.map((c) => {
              const Icon = getIconForCategory(c.slug)
              return (
                <Link
                  key={c.id}
                  href={`/books?category=${c.slug}`}
                  className="group rounded-2xl border bg-card p-6 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-1 transition-all mt-1"
                    />
                  </div>
                  <h2 className="font-display text-xl mt-4">{c.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {c._count.books} {c._count.books === 1 ? "book" : "books"}
                  </p>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <LayoutGrid size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No categories yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Categories will appear here once books are added.
            </p>
          </div>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="rounded-[28px] border bg-card p-8 text-center max-w-xl mx-auto">
          <BookOpen size={28} className="mx-auto text-amber-500 mb-3" />
          <h3 className="font-display text-xl">Looking for something specific?</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Use our search to find exactly the book you need.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 text-sm mt-4 transition-colors"
          >
            <BookOpen size={16} />
            Browse All Books
          </Link>
        </div>
      </section>
    </div>
  )
}
