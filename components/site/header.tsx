"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Moon, Sun, Instagram, BookOpen } from "lucide-react"
import { useTheme } from "next-themes"
import { useCart } from "@/lib/cart-store"

export function Header(){
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const count = useCart(s => s.items.reduce((n,i)=>n+i.qty,0))

  useEffect(() => setMounted(true), [])

  const isDark = mounted && theme === "dark"

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-[22px] tracking-tight flex items-center gap-2">
          <BookOpen size={24} className="text-amber-500" />
          {siteConfig.name}
        </Link>
        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <Link href="/books">Books</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full hover:bg-accent transition-colors hidden sm:flex"
          >
            <Instagram size={18} />
          </a>
          <button
            aria-label="theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
          </button>
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-accent transition-colors"><ShoppingBag size={20}/>{count>0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full px-1.5">{count}</span>}</Link>
          <Link href="/login"><Button size="sm" variant="secondary">Sign in</Button></Link>
        </div>
      </div>
    </header>
  )
}
