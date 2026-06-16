"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { toast } from "sonner"
import { BookOpen, Mail, Lock, LogIn } from "lucide-react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setLoading(true)
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      toast.error("Invalid credentials")
    } else {
      window.location.href = "/account"
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
          <h2 className="font-display text-3xl">Welcome to BookEmpir</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Your destination for premium books on design, technology, psychology, and creative living. Sign in to access your account, orders, and wishlist.
          </p>
        </div>
      </div>

      {/* ── Right: Login Form ─────────────────────────── */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <BookOpen size={24} className="text-amber-500" />
            <span className="font-display text-xl">BookEmpir</span>
          </div>

          <h1 className="font-display text-3xl mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
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
                placeholder="••••••••"
                className="rounded-xl"
              />
            </div>
            <Button
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2"
              size="lg"
            >
              <LogIn size={16} />
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/account" })}
            className="w-full border rounded-xl py-3 text-sm font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-amber-600 dark:text-amber-400 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
