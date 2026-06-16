import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { Mail, Instagram, BookOpen } from "lucide-react"

export function Footer(){
  return (
    <footer className="border-t mt-24 py-16 text-sm text-muted-foreground">
      <div className="container grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-xl text-foreground mb-2 flex items-center gap-2">
            <BookOpen size={22} className="text-amber-500" />
            {siteConfig.name}
          </div>
          <p>{siteConfig.description}</p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href={siteConfig.links.email}
              aria-label="Email"
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
        <div>
          <div className="font-medium text-foreground mb-3">Shop</div>
          <ul className="space-y-2">
            <li><Link href="/books">All Books</Link></li>
            <li><Link href="/categories">Categories</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-foreground mb-3">Support</div>
          <ul className="space-y-2">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/shipping">Shipping</Link></li>
            <li><Link href="/refunds">Refunds</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-foreground mb-3">Legal</div>
          <ul className="space-y-2">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</span>
        <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground transition-colors flex items-center gap-1.5">
          <Mail size={14} />
          {siteConfig.email}
        </a>
      </div>
    </footer>
  )
}
