import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
export async function POST(req: Request){
  const sig = req.headers.get("stripe-signature")!
  const buf = await req.text()
  let event
  try { event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!) } 
  catch { return NextResponse.json({error:"bad"}, {status:400})}
  if(event.type === "checkout.session.completed"){
    const s = event.data.object as any
    // create order record minimal
    await db.order.create({ data: {
      orderNumber: "ORD-" + Date.now(),
      email: s.customer_details?.email || "unknown",
      total: (s.amount_total||0)/100,
      subtotal: (s.amount_total||0)/100,
      stripePaymentIntentId: s.payment_intent,
      status: "PAID",
    }})
  }
  return NextResponse.json({ received: true })
}
