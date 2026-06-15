"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
export default function Register(){
  const [loading,setLoading]=useState(false)
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); const fd = new FormData(e.currentTarget)
    setLoading(true)
    const res = await fetch("/api/auth/register", { method:"POST", body: JSON.stringify(Object.fromEntries(fd)), headers:{"Content-Type":"application/json"}})
    setLoading(false)
    if(res.ok){ toast.success("Account created. Please sign in."); window.location.href="/login"} else toast.error("Failed")
  }
  return <div className="min-h-screen grid place-items-center p-6"><div className="w-full max-w-sm border rounded-[28px] p-8 bg-card">
    <h1 className="font-display text-3xl mb-6">Create account</h1>
    <form onSubmit={submit} className="space-y-4">
      <div><Label>Name</Label><Input name="name" required /></div>
      <div><Label>Email</Label><Input name="email" type="email" required /></div>
      <div><Label>Password</Label><Input name="password" type="password" required minLength={6} /></div>
      <Button disabled={loading} className="w-full">Create account</Button>
    </form>
    <p className="text-sm text-muted-foreground mt-4"><Link href="/login" className="underline">Already have an account?</Link></p>
  </div></div>
}
