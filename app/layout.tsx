import "./globals.css"
import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} — Books by ${siteConfig.author}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: { type: "website", title: siteConfig.name, description: siteConfig.description },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
