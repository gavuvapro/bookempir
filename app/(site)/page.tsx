import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { BookCard } from "@/components/site/book-card"
import { NewsletterForm } from "@/components/site/newsletter-form"

export default async function HomePage(){
  const featured = await db.book.findMany({ where: { featured: true, published: true }, take: 4, include: { category: true }})
  const latest = await db.book.findMany({ where: { published: true }, orderBy: { createdAt: "desc"}, take: 3, include: { category: true }})
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/hero-bg.jpg"
          alt="Cozy library with bookshelves"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

        {/* Content */}
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-amber-300 mb-4">Fabrice Ishimwe — Author</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-white">
              Books crafted with care, for curious minds.
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Essays, guides, and stories on design, slow creativity, and meaningful work. Beautifully designed print and instant digital editions.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/books"><Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">Shop Books</Button></Link>
              <Link href="/about"><Button variant="outline" size="lg" className="border-white/60 text-white hover:bg-white/10">About the author</Button></Link>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-8 text-sm text-white/70 max-w-md border-t border-white/20 pt-8">
              <div><div className="text-2xl font-display text-white">42k+</div>Readers</div>
              <div><div className="text-2xl font-display text-white">4.9★</div>Avg rating</div>
              <div><div className="text-2xl font-display text-white">12</div>Titles</div>
            </div>
          </div>
        </div>
      </section>


      <section className="container pb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl">Featured</h2>
          <Link href="/books" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(b => <BookCard key={b.id} book={b} />)}
          {featured.length===0 && <p className="text-muted-foreground">Add featured books in the CMS.</p>}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-4xl">Hi, I'm Fabrice.</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">I write about design systems, creative routines, and the quiet joy of making things by hand. My books are small, focused, and meant to be re-read.</p>
            <Link href="/about" className="inline-block mt-4 text-sm underline">Read my story →</Link>
          </div>
          <div className="rounded-[32px] bg-background border p-10 shadow-sm">
            <div className="text-muted-foreground italic">"Fabrice's writing feels like a warm studio lamp — clear, calm, and genuinely useful."</div>
            <div className="text-sm mt-3">— A Reader</div>
          </div>
        </div>
      </section>

      {latest.length>0 && <section className="container py-20">
        <h2 className="font-display text-3xl mb-6">Latest releases</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map(b => <BookCard key={b.id} book={b} />)}
        </div>
      </section>}

      <section className="container pb-24">
        <div className="rounded-[32px] border bg-card p-10 md:p-14 text-center max-w-2xl mx-auto">
          <h3 className="font-display text-3xl">Join the newsletter</h3>
          <p className="text-muted-foreground mt-2">New essays, book notes, and early chapter previews — monthly.</p>
          <div className="mt-6"><NewsletterForm /></div>
        </div>
      </section>
    </div>
  )
}
