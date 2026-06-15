"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { toast } from "sonner"
export default function LoginPage(){
  const [loading,setLoading]=useState(false)
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setLoading(true)
    const res = await signIn("credentials", { email: fd.get("email"), password: fd.get("password"), redirect: false })
    setLoading(false)
    if(res?.error){ toast.error("Invalid credentials")} else { window.location.href="/account" }
  }
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-sm border rounded-[28px] p-8 shadow-sm bg-card">
        <h1 className="font-display text-3xl mb-6">Welcome back</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div><Label>Email</Label><Input name="email" type="email" required /></div>
          <div><Label>Password</Label><Input name="password" type="password" required /></div>
          <Button disabled={loading} className="w-full">Sign in</Button>
        </form>
        <button onClick={()=>signIn("google", { callbackUrl:"/account" })} className="w-full mt-3 border rounded-full py-2.5 text-sm">Continue with Google</button>
        <p className="text-sm text-muted-foreground mt-4">No account? <Link href="/register" className="underline">Create one</Link></p>
      </div>
    </div>
  )
}
