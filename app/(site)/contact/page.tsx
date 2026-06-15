"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function Contact(){
  const [loading,setLoading]=useState(false)
  async function submit(e:React.FormEvent<HTMLFormElement>){ e.preventDefault(); setLoading(true); const fd=Object.fromEntries(new FormData(e.currentTarget)); const r=await fetch("/api/contact", {method:"POST", headers:{ "Content-Type":"application/json"}, body:JSON.stringify(fd)}); setLoading(false); if(r.ok){toast.success("Sent!"); (e.target as HTMLFormElement).reset()} else toast.error("Failed")}
  return <div className="container py-16 max-w-xl"><h1 className="font-display text-4xl mb-6">Contact</h1><form onSubmit={submit} className="space-y-4"><Input name="name" placeholder="Name" required /><Input name="email" type="email" placeholder="Email" required /><Input name="subject" placeholder="Subject" required /><textarea name="message" required placeholder="Message" className="w-full border rounded-2xl p-4 bg-background min-h-[140px]" /><Button disabled={loading}>Send</Button></form></div>
}
