import {
  Truck,
  Globe,
  Clock,
  PackageCheck,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Mail,
} from "lucide-react"
import { siteConfig } from "@/lib/site"
import Link from "next/link"

const shippingMethods = [
  {
    icon: Truck,
    title: "Standard Shipping",
    time: "5–7 business days",
    desc: "Free on orders over $50. Reliable tracking included.",
  },
  {
    icon: Clock,
    title: "Express Shipping",
    time: "2–3 business days",
    desc: "Priority handling and expedited delivery for urgent orders.",
  },
  {
    icon: Globe,
    title: "International Shipping",
    time: "7–14 business days",
    desc: "We ship to 100+ countries. Customs fees may apply at destination.",
  },
  {
    icon: PackageCheck,
    title: "Digital Delivery",
    time: "Instant",
    desc: "All digital editions are delivered instantly to your email as DRM-free files.",
  },
]

export default function ShippingPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <Truck size={16} />
            Shipping Information
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            Shipping & Delivery
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            We're committed to getting your books to you safely and promptly, no matter where you are in the world.
          </p>
        </div>
      </section>

      {/* ── Shipping Methods ──────────────────────────── */}
      <section className="container py-16 md:py-20">
        <h2 className="font-display text-2xl mb-8">Shipping Methods</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {shippingMethods.map(({ icon: Icon, title, time, desc }) => (
            <div
              key={title}
              className="rounded-2xl border bg-card p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    {time}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Details ───────────────────────────────────── */}
      <section className="bg-secondary/60 dark:bg-secondary/30">
        <div className="container py-16 md:py-20 max-w-4xl">
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-amber-500" />
                <h3 className="font-display text-xl">Order Tracking</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Once your order ships, you'll receive an email with a tracking number and a link to track your package in real-time. You can also view order status in your <Link href="/account" className="text-amber-600 dark:text-amber-400 underline">account dashboard</Link>.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-amber-500" />
                <h3 className="font-display text-xl">Packaging & Care</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Every book is carefully packaged in eco-friendly, protective materials to ensure it arrives in pristine condition. We use rigid mailers for paperbacks and bubble-wrapped boxes for hardcovers and multi-book orders.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={18} className="text-amber-500" />
                <h3 className="font-display text-xl">Damaged or Lost Shipments</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                If your order arrives damaged or is lost in transit, please contact us at{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-amber-600 dark:text-amber-400 underline">
                  {siteConfig.email}
                </a>{" "}
                within 14 days of the expected delivery date. We'll send a replacement or issue a full refund — whichever you prefer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="container py-16 pb-24">
        <div className="rounded-[28px] border bg-card p-8 text-center max-w-xl mx-auto">
          <Mail size={28} className="mx-auto text-amber-500 mb-3" />
          <h3 className="font-display text-xl">Questions about shipping?</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Reach out to our team and we'll be happy to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 text-sm mt-4 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
