import {
  Shield,
  Database,
  Eye,
  Lock,
  UserCheck,
  Cookie,
  Mail,
  FileText,
} from "lucide-react"
import { siteConfig } from "@/lib/site"

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Account information: name, email address, and password when you create an account.",
      "Order information: shipping address, billing address, and payment details (processed securely through Stripe — we never store full card numbers).",
      "Usage data: pages visited, time spent on site, and interactions to improve your experience.",
      "Communications: messages you send via our contact form or email.",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "To process and fulfill your orders, including shipping and digital delivery.",
      "To manage your account and provide customer support.",
      "To send transactional emails (order confirmations, shipping updates).",
      "To send our newsletter (only with your explicit consent — you can unsubscribe anytime).",
      "To improve our website, products, and services through analytics.",
    ],
  },
  {
    icon: UserCheck,
    title: "Information Sharing",
    content: [
      "We do not sell, rent, or trade your personal information to third parties.",
      "We share information only with trusted service providers necessary to operate our business: payment processors (Stripe), email services, and shipping carriers.",
      "We may disclose information if required by law or to protect our rights and safety.",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "All data transmission is encrypted using SSL/TLS technology.",
      "Passwords are hashed using bcrypt and never stored in plain text.",
      "We implement rate limiting and brute-force protection on all authentication endpoints.",
      "Regular security audits are conducted to maintain the highest standards.",
    ],
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    content: [
      "We use essential cookies to maintain your session and shopping cart.",
      "Analytics cookies help us understand how visitors interact with our site.",
      "You can control cookie preferences through your browser settings.",
      "We do not use cookies for targeted advertising.",
    ],
  },
  {
    icon: FileText,
    title: "Your Rights",
    content: [
      "Access: You can request a copy of all personal data we hold about you.",
      "Correction: You can update your account information at any time.",
      "Deletion: You can request the deletion of your account and associated data.",
      "Portability: You can request your data in a machine-readable format.",
      `To exercise any of these rights, contact us at ${siteConfig.email}.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <Shield size={16} />
            Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            At BookEmpir, your privacy is important to us. This policy explains what data we collect, how we use it, and your rights regarding your personal information.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>

      {/* ── Sections ──────────────────────────────────── */}
      <section className="container py-16 md:py-20 max-w-4xl">
        <div className="space-y-8">
          {sections.map(({ icon: Icon, title, content }) => (
            <div key={title} className="rounded-2xl border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Icon size={18} />
                </div>
                <h2 className="font-display text-xl">{title}</h2>
              </div>
              <ul className="space-y-3">
                {content.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-amber-200 dark:border-amber-800">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────── */}
      <section className="container pb-24">
        <div className="rounded-[28px] border bg-card p-8 text-center max-w-xl mx-auto">
          <Mail size={28} className="mx-auto text-amber-500 mb-3" />
          <h3 className="font-display text-xl">Privacy Concerns?</h3>
          <p className="text-sm text-muted-foreground mt-2">
            If you have any questions about this privacy policy or how we handle your data, please reach out.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 text-sm mt-4 transition-colors"
          >
            <Mail size={16} />
            {siteConfig.email}
          </a>
        </div>
      </section>
    </div>
  )
}
