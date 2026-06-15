"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export function NewsletterForm(){
  const [email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
  const submit = async (e:React.FormEvent)=>{ e.preventDefault(); setLoading(true);
    const r = await fetch("/api/newsletter", { method:"POST", body: JSON.stringify({email}), headers:{ "Content-Type":"application/json"}})
    setLoading(false)
    if(r.ok){ toast.success("Subscribed!"); setEmail("") } else { toast.error("Failed")}
  }
  return <form onSubmit={submit} className="flex gap-2 max-w-md mx-auto"><Input type="email" required placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} /><Button disabled={loading}>Join</Button></form>
}
