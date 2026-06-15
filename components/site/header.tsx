"use client"
import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useCart } from "@/lib/cart-store"

export function Header(){
  const { theme, setTheme } = useTheme()
  const count = useCart(s => s.items.reduce((n,i)=>n+i.qty,0))
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-[22px] tracking-tight">{siteConfig.name}</Link>
        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <Link href="/books">Books</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="theme" onClick={()=>setTheme(theme==="dark"?"light":"dark")} className="p-2 rounded-full hover:bg-accent">{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-accent"><ShoppingBag size={20}/>{count>0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full px-1.5">{count}</span>}</Link>
          <Link href="/login"><Button size="sm" variant="secondary">Sign in</Button></Link>
        </div>
      </div>
    </header>
  )
}
