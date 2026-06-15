"use client"
import { useCart } from "@/lib/cart-store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
export default function CartPage(){
  const { items, setQty, remove, total } = useCart()
  if(items.length===0) return <div className="container py-20"><h1 className="font-display text-4xl mb-4">Cart</h1><p className="text-muted-foreground">Your cart is empty. <Link className="underline" href="/books">Browse books</Link></p></div>
  return (
    <div className="container py-16">
      <h1 className="font-display text-4xl mb-8">Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map(i => (
            <div key={i.id} className="flex gap-4 border rounded-2xl p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.coverImage} className="w-20 h-24 object-cover rounded-xl bg-secondary" alt="" />
              <div className="flex-1">
                <Link href={`/books/${i.slug}`} className="font-medium">{i.title}</Link>
                <div className="text-sm text-muted-foreground">{formatPrice(i.price)}</div>
                <button onClick={()=>remove(i.id)} className="text-xs text-muted-foreground underline mt-2">Remove</button>
              </div>
              <input type="number" min={1} value={i.qty} onChange={e=>setQty(i.id, parseInt(e.target.value)||1)} className="w-20 border rounded-xl px-3 h-10 bg-background" />
            </div>
          ))}
        </div>
        <div className="border rounded-[24px] p-6 h-fit sticky top-24">
          <div className="flex justify-between text-sm mb-2"><span>Subtotal</span><span>{formatPrice(total())}</span></div>
          <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t"><span>Total</span><span>{formatPrice(total())}</span></div>
          <Link href="/checkout"><Button className="w-full mt-4" size="lg">Checkout</Button></Link>
        </div>
      </div>
    </div>
  )
}
