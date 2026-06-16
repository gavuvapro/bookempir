"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { siteConfig } from "@/lib/site"
import {
  Mail,
  Instagram,
  Send,
  MessageSquare,
  Clock,
  MapPin,
} from "lucide-react"

export default function Contact() {
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = Object.fromEntries(new FormData(e.currentTarget))
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fd),
    })
    setLoading(false)
    if (r.ok) {
      toast.success("Message sent successfully!")
      ;(e.target as HTMLFormElement).reset()
    } else {
      toast.error("Failed to send message")
    }
  }

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <MessageSquare size={16} />
            Get in Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl max-w-2xl">
            We'd love to hear from you
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Have a question about a book, partnership inquiry, or just want to say hello? Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────── */}
      <section className="container py-16 md:py-20">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info Cards */}
          <div className="md:col-span-2 space-y-5">
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Mail size={18} />
                </div>
                <h3 className="font-medium">Email</h3>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Instagram size={18} />
                </div>
                <h3 className="font-medium">Instagram</h3>
              </div>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                @bookempir
              </a>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Clock size={18} />
                </div>
                <h3 className="font-medium">Response Time</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24–48 hours
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <MapPin size={18} />
                </div>
                <h3 className="font-medium">Location</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Serving readers worldwide
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="rounded-[28px] border bg-card p-8 md:p-10 shadow-sm">
              <h2 className="font-display text-2xl mb-6">Send a Message</h2>
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Name
                    </label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    placeholder="What's this about?"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell us what's on your mind..."
                    className="w-full border rounded-2xl p-4 bg-background min-h-[160px] resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow"
                  />
                </div>
                <Button
                  disabled={loading}
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2"
                >
                  <Send size={16} />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
