import Link from "next/link"
export default function Success(){ return <div className="container py-24 text-center max-w-xl mx-auto"><h1 className="font-display text-4xl">Thank you!</h1><p className="text-muted-foreground mt-3">Your order is confirmed. A receipt has been emailed to you.</p><Link href="/books" className="underline mt-6 inline-block">Continue shopping</Link></div>}
