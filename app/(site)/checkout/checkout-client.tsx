"use client"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
export function CheckoutClient({ email }: { email: string }) {
  const items = useCart(s=>s.items)
  const total = useCart(s=>s.total())
  const [loading,setLoading]=useState(false)
  const pay = async () => {
    setLoading(true)
    const res = await fetch("/api/checkout", { method:"POST", headers:{ "Content-Type":"application/json"}, body: JSON.stringify({ items, email })})
    const data = await res.json()
    setLoading(false)
    if(data.url) window.location.href = data.url
  }
  return (
    <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
      <div className="space-y-4">
        <Input placeholder="Email" defaultValue={email} />
        <Input placeholder="Full name" />
        <Input placeholder="Address" />
        <div className="grid grid-cols-2 gap-3"><Input placeholder="City" /><Input placeholder="Postal" /></div>
        <p className="text-xs text-muted-foreground">Secure Stripe checkout. You’ll be redirected to complete payment.</p>
      </div>
      <div className="border rounded-[24px] p-6 h-fit">
        <div className="space-y-2 text-sm">{items.map(i=> <div key={i.id} className="flex justify-between"><span>{i.title} × {i.qty}</span><span>${(i.price*i.qty).toFixed(2)}</span></div>)}</div>
        <div className="border-t mt-4 pt-4 font-medium flex justify-between">Total <span>${total.toFixed(2)}</span></div>
        <Button onClick={pay} disabled={loading || items.length===0} className="w-full mt-4">{loading?"Redirecting…":"Pay with Stripe"}</Button>
      </div>
    </div>
  )
}
