import {
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
import { siteConfig } from "@/lib/site"
import Link from "next/link"

const steps = [
  {
    icon: Mail,
    title: "1. Contact Us",
    desc: `Email us at ${siteConfig.email} with your order number and reason for the refund request.`,
  },
  {
    icon: Clock,
    title: "2. We Review",
    desc: "Our team will review your request within 1–2 business days and confirm eligibility.",
  },
  {
    icon: CheckCircle2,
    title: "3. Refund Processed",
    desc: "Once approved, your refund will be processed to the original payment method within 5–7 business days.",
  },
]

const eligible = [
  "Books received in damaged condition",
  "Wrong item delivered",
  "Order not received within the estimated delivery window",
  "Digital edition with technical issues preventing access",
  "Duplicate charges on your account",
]

const notEligible = [
  "Books that have been used, marked, or show signs of wear",
  "Requests made more than 30 days after delivery",
  "Change of mind after reading a digital edition",
  "Promotional or sale items marked as final sale",
]

export default function RefundsPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <RefreshCw size={16} />
            Returns & Refunds
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            Refund Policy
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Your satisfaction matters. We offer a straightforward 30-day refund policy for all eligible purchases.
          </p>
        </div>
      </section>

      {/* ── Guarantee Badge ───────────────────────────── */}
      <section className="container py-16 md:py-20">
        <div className="rounded-[28px] border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 className="font-display text-2xl">30-Day Money-Back Guarantee</h2>
            <p className="text-muted-foreground mt-1">
              Not satisfied with your purchase? No problem. We offer full refunds within 30 days of delivery — no questions asked for eligible items.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────── */}
      <section className="bg-secondary/60 dark:bg-secondary/30">
        <div className="container py-16 md:py-20">
          <h2 className="font-display text-2xl mb-8 text-center">How Refunds Work</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border bg-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eligibility ───────────────────────────────── */}
      <section className="container py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 size={20} className="text-green-500" />
              <h3 className="font-display text-xl">Eligible for Refund</h3>
            </div>
            <ul className="space-y-3">
              {eligible.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <XCircle size={20} className="text-red-400" />
              <h3 className="font-display text-xl">Not Eligible</h3>
            </div>
            <ul className="space-y-3">
              {notEligible.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="rounded-[28px] border bg-card p-8 text-center max-w-xl mx-auto">
          <RefreshCw size={28} className="mx-auto text-amber-500 mb-3" />
          <h3 className="font-display text-xl">Need to request a refund?</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Email us with your order number and we'll take care of the rest.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 text-sm transition-colors"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm hover:bg-accent transition-colors"
            >
              Contact Form
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
