"use client"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store"
import { toast } from "sonner"
export function AddToCart({ book }: { book: { id:string; title:string; price:number; coverImage:string; slug:string }}) {
  const add = useCart(s=>s.add)
  return <Button onClick={()=>{ add({ ...book, qty:1 }); toast.success("Added to cart")}} size="lg">Add to cart — ${book.price.toFixed(2)}</Button>
}
