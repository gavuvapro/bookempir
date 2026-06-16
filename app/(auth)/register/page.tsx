"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { BookOpen, User, Mail, Lock, UserPlus } from "lucide-react"

export default function Register() {
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(fd)),
      headers: { "Content-Type": "application/json" },
    })
    setLoading(false)
    if (res.ok) {
      toast.success("Account created. Please sign in.")
      window.location.href = "/login"
    } else {
      toast.error("Failed to create account")
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left: Brand Panel ─────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950/30 dark:via-background dark:to-amber-950/20 p-12">
        <div className="max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white mx-auto mb-6">
            <BookOpen size={32} />
          </div>
          <h2 className="font-display text-3xl">Join BookEmpir</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Create an account to save your favorite books, track orders, and get personalized recommendations from our curated collection.
          </p>
        </div>
      </div>

      {/* ── Right: Register Form ──────────────────────── */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <BookOpen size={24} className="text-amber-500" />
            <span className="font-display text-xl">BookEmpir</span>
          </div>

          <h1 className="font-display text-3xl mb-2">Create account</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Get started with BookEmpir in seconds
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label className="flex items-center gap-1.5 mb-1.5">
                <User size={14} />
                Name
              </Label>
              <Input
                name="name"
                required
                placeholder="Your full name"
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="flex items-center gap-1.5 mb-1.5">
                <Mail size={14} />
                Email
              </Label>
              <Input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="flex items-center gap-1.5 mb-1.5">
                <Lock size={14} />
                Password
              </Label>
              <Input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="rounded-xl"
              />
            </div>
            <Button
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2"
              size="lg"
            >
              <UserPlus size={16} />
              {loading ? "Creating…" : "Create Account"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-amber-600 dark:text-amber-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
