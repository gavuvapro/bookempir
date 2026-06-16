"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Mail, ArrowRight } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const r = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
    setLoading(false)
    if (r.ok) {
      toast.success("Welcome aboard! 🎉")
      setEmail("")
    } else {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-2 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>
      <Button
        disabled={loading}
        className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-1.5 rounded-xl"
      >
        {loading ? "Joining…" : "Join"}
        <ArrowRight size={14} />
      </Button>
    </form>
  )
}
