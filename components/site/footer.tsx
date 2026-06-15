import Link from "next/link"
import { siteConfig } from "@/lib/site"
export function Footer(){
  return (
    <footer className="border-t mt-24 py-16 text-sm text-muted-foreground">
      <div className="container grid md:grid-cols-4 gap-10">
        <div><div className="font-display text-xl text-foreground mb-2">{siteConfig.name}</div><p>{siteConfig.description}</p></div>
        <div><div className="font-medium text-foreground mb-3">Shop</div><ul className="space-y-2"><li><Link href="/books">All Books</Link></li><li><Link href="/categories">Categories</Link></li></ul></div>
        <div><div className="font-medium text-foreground mb-3">Support</div><ul className="space-y-2"><li><Link href="/faq">FAQ</Link></li><li><Link href="/shipping">Shipping</Link></li><li><Link href="/refunds">Refunds</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
        <div><div className="font-medium text-foreground mb-3">Legal</div><ul className="space-y-2"><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li></ul></div>
      </div>
      <div className="container mt-12 pt-8 border-t text-xs">© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</div>
    </footer>
  )
}
