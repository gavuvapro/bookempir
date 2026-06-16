import {
  Mail,
  Instagram,
  BookOpen,
  Palette,
  Lightbulb,
  Cpu,
  Brain,
  BookMarked,
  Trophy,
  Target,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { siteConfig } from "@/lib/site"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  { icon: Palette, label: "Design and Craft" },
  { icon: Lightbulb, label: "Creative Living" },
  { icon: Cpu, label: "Technology and Artificial Intelligence" },
  { icon: Brain, label: "Psychology and Human Behavior" },
  { icon: BookMarked, label: "Philosophy" },
  { icon: Trophy, label: "Sports and Performance" },
  { icon: Target, label: "Strategic Living" },
  { icon: Users, label: "Society and Culture" },
  { icon: Sparkles, label: "And many more thought-provoking topics" },
]

export default function About() {
  return (
    <div>
      {/* ── Hero Section ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.08),transparent_60%)]" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
              <BookOpen size={16} />
              About BookEmpir
            </p>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Where great books meet{" "}
              <span className="text-amber-600 dark:text-amber-400">curious minds</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We believe that great books have the power to transform how we think, create, and live.
              That's why we carefully select premium titles that inspire curiosity, strategic thinking,
              and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Cover ─────────────────────────────── */}
      <section className="container py-20 md:py-24">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl">Our Collection</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A wide range of subjects handpicked to expand your perspective and fuel your growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {categories.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 transition-transform group-hover:scale-110">
                <Icon size={20} />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────── */}
      <section className="bg-secondary/60 dark:bg-secondary/30">
        <div className="container py-20 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                <Target size={16} />
                Our Mission
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                Exceptional books for deeper thinking
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed text-[16px]">
                To provide readers with exceptional books that encourage creativity, deeper thinking,
                and continuous self-development. Every title in our collection is chosen because it has
                the potential to shift perspectives and spark meaningful change.
              </p>
              <Link href="/books" className="inline-block mt-6">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2">
                  Explore Our Collection
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            <div className="space-y-5">
              {[
                {
                  title: "Curated Selection",
                  desc: "Every book is handpicked for quality, depth, and transformative potential.",
                },
                {
                  title: "Diverse Topics",
                  desc: "From AI to philosophy, sports to psychology — knowledge has no boundaries.",
                },
                {
                  title: "Personal Growth",
                  desc: "Books that help you think bigger, create better, and live more intentionally.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <h4 className="font-display text-lg">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About the Founder ──────────────────────────── */}
      <section className="container py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
            The Founder
          </p>
          <h2 className="font-display text-3xl md:text-4xl">Fabrice Ishimwe</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-[16px] max-w-xl mx-auto">
            A passionate reader, writer and entrepreneur who believes in the power of books to change lives.
            BookEmpir was born from a desire to share carefully curated knowledge with curious minds
            everywhere.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm hover:bg-accent transition-colors"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm hover:bg-accent transition-colors"
            >
              <Instagram size={16} />
              @bookempir
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="rounded-[32px] border bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-10 md:p-14 text-center max-w-2xl mx-auto">
          <h3 className="font-display text-3xl">Ready to discover your next read?</h3>
          <p className="text-muted-foreground mt-3">
            Browse our curated collection and find books that will transform your thinking.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/books">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2">
                <BookOpen size={18} />
                Browse Books
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                <Mail size={18} />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
