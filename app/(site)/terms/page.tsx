import {
  Scale,
  FileText,
  ShoppingBag,
  CreditCard,
  BookOpen,
  UserCheck,
  AlertTriangle,
  Ban,
  Mail,
} from "lucide-react"
import { siteConfig } from "@/lib/site"

const sections = [
  {
    icon: UserCheck,
    title: "Account Terms",
    content: [
      "You must be at least 16 years old to create an account on BookEmpir.",
      "You are responsible for maintaining the security of your account and password.",
      "You must provide accurate and complete information when creating an account.",
      "One person or entity may not maintain more than one account.",
      "You are responsible for all activity that occurs under your account.",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Orders & Purchases",
    content: [
      "All prices are displayed in USD and are subject to change without notice.",
      "By placing an order, you agree to pay the listed price plus any applicable shipping fees.",
      "We reserve the right to refuse or cancel any order at our discretion.",
      "Order confirmation emails serve as acknowledgment, not acceptance. Acceptance occurs upon shipment.",
      "Promotional codes and discounts cannot be applied retroactively to existing orders.",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment & Billing",
    content: [
      "Payments are processed securely through Stripe. We do not store your full credit card information.",
      "You agree to provide current, complete, and accurate billing information.",
      "If payment cannot be processed, we reserve the right to cancel your order.",
      "All sales are in USD. Currency conversion fees from your bank may apply for international orders.",
    ],
  },
  {
    icon: BookOpen,
    title: "Intellectual Property",
    content: [
      "All content on BookEmpir, including book descriptions, images, and website design, is protected by copyright.",
      "Digital editions are licensed for personal, non-commercial use only.",
      "You may not reproduce, distribute, or share digital book files with third parties.",
      "Book reviews submitted to our site become our property and may be used for promotional purposes.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: [
      "BookEmpir is provided \"as is\" without warranties of any kind, express or implied.",
      "We are not liable for any indirect, incidental, or consequential damages arising from use of our service.",
      "Our total liability for any claim shall not exceed the amount paid by you for the specific product in question.",
      "We are not responsible for delays caused by shipping carriers or customs authorities.",
    ],
  },
  {
    icon: Ban,
    title: "Prohibited Conduct",
    content: [
      "Using the service for any unlawful purpose or in violation of any applicable laws.",
      "Attempting to gain unauthorized access to other users' accounts or our systems.",
      "Submitting false reviews, fraudulent orders, or misleading information.",
      "Using automated tools to scrape, crawl, or collect data from our website.",
      "Reselling books purchased from BookEmpir for commercial profit without authorization.",
    ],
  },
  {
    icon: FileText,
    title: "Changes to Terms",
    content: [
      "We reserve the right to modify these terms at any time. Changes will be posted on this page.",
      "Continued use of BookEmpir after changes are posted constitutes acceptance of the updated terms.",
      "For significant changes, we will notify registered users via email.",
      `Questions about these terms? Contact us at ${siteConfig.email}.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <Scale size={16} />
            Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            By using BookEmpir, you agree to these terms. Please read them carefully before making a purchase or creating an account.
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
          <Scale size={28} className="mx-auto text-amber-500 mb-3" />
          <h3 className="font-display text-xl">Questions about our terms?</h3>
          <p className="text-sm text-muted-foreground mt-2">
            We're here to help clarify anything. Reach out anytime.
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
