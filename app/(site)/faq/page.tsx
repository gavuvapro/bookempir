import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
export default function Faq(){ const faqs = [
  ["Do you ship worldwide?","Yes, digital instantly, print worldwide."],
  ["What about refunds?","30-day no questions asked. Email hello@yourdomain.com."],
  ["Are there digital editions?","Yes, every print book includes a DRM-free PDF/ePub."],
  ["Can I gift a book?","Yes, add a gift note at checkout."]
]; return <div className="container py-16 max-w-2xl"><h1 className="font-display text-4xl mb-6">FAQ</h1><Accordion type="single" collapsible>{faqs.map(([q,a],i)=> <AccordionItem key={i} value={"i"+i}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></div>}
