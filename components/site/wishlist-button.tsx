"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export function WishlistButton({ bookId }:{ bookId:string }){
  const add = async ()=> { const r = await fetch("/api/wishlist", { method:"POST", headers:{ "Content-Type":"application/json"}, body: JSON.stringify({ bookId })}); if(r.ok) toast.success("Saved to wishlist"); else toast.error("Sign in required")}
  return <Button variant="outline" onClick={add}>♡ Wishlist</Button>
}
