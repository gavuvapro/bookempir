import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
export async function POST(req: Request){
  const { items, email } = await req.json()
  const line_items = items.map((i:any)=>({ price_data: { currency: "usd", product_data: { name: i.title }, unit_amount: Math.round(i.price*100)}, quantity: i.qty }))
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    customer_email: email || undefined,
    success_url: process.env.NEXT_PUBLIC_SITE_URL + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL + "/cart",
  })
  return NextResponse.json({ url: session.url })
}
