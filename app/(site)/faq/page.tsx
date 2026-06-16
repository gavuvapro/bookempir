import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  HelpCircle,
  Globe,
  RefreshCw,
  Smartphone,
  Gift,
  CreditCard,
  Truck,
  BookOpen,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/site"

const faqs = [
  {
    icon: Globe,
    q: "Do you ship worldwide?",
    a: "Yes! Digital editions are delivered instantly to your inbox. Print books are shipped worldwide with tracking. Delivery times vary by region — typically 5–10 business days internationally.",
  },
  {
    icon: RefreshCw,
    q: "What is your refund policy?",
    a: `We offer a 30-day no-questions-asked refund policy. If you're not satisfied with your purchase, simply email us at ${siteConfig.email} and we'll process your refund promptly.`,
  },
  {
    icon: Smartphone,
    q: "Are there digital editions available?",
    a: "Yes, every print book includes a DRM-free PDF and ePub. You can read on any device — Kindle, iPad, phone, or computer. Digital-only purchases are also available at a reduced price.",
  },
  {
    icon: Gift,
    q: "Can I gift a book to someone?",
    a: "Absolutely! During checkout you can add a personalized gift note and specify a different shipping address. We'll wrap it beautifully and include your message.",
  },
  {
    icon: CreditCard,
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are securely processed through Stripe.",
  },
  {
    icon: Truck,
    q: "How long does shipping take?",
    a: "Domestic orders typically arrive in 3–5 business days. International shipping takes 7–14 business days depending on location. You'll receive a tracking number via email once your order ships.",
  },
  {
    icon: BookOpen,
    q: "What types of books do you offer?",
    a: "Our curated collection covers design, technology & AI, psychology, philosophy, sports & performance, creative living, strategic thinking, and more. Each title is handpicked for quality and impact.",
  },
  {
    icon: Mail,
    q: "How can I contact support?",
    a: `You can reach us at ${siteConfig.email} or through our contact form. We typically respond within 24–48 hours. You can also follow us on Instagram @bookempir for updates.`,
  },
]

export default function Faq() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <HelpCircle size={16} />
            Help Center
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Everything you need to know about shopping at BookEmpir. Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-amber-600 dark:text-amber-400 underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── FAQ Items ─────────────────────────────────── */}
      <section className="container py-16 md:py-20 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(({ icon: Icon, q, a }, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border rounded-2xl px-6 data-[state=open]:shadow-sm transition-shadow"
            >
              <AccordionTrigger className="hover:no-underline gap-3 text-left">
                <span className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Icon size={16} />
                  </span>
                  <span className="font-medium">{q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-11 pb-5">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="rounded-[28px] border bg-card p-8 md:p-12 text-center max-w-2xl mx-auto">
          <HelpCircle size={32} className="mx-auto text-amber-500 mb-4" />
          <h3 className="font-display text-2xl">Still have questions?</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 text-sm transition-colors"
            >
              <Mail size={16} />
              Contact Us
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm hover:bg-accent transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
