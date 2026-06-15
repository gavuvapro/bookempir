import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <><Header /> <main className="min-h-[70vh]">{children}</main> <Footer /></>
}
