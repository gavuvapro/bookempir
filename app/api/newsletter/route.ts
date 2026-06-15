import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { NewsletterSchema } from "@/lib/validators"
export async function POST(req: Request){
  const body = await req.json()
  const parsed = NewsletterSchema.safeParse(body)
  if(!parsed.success) return NextResponse.json({error:"Invalid"}, {status:400})
  try {
    await db.newsletterSubscriber.create({ data: { email: parsed.data.email }})
  } catch {}
  return NextResponse.json({ ok:true })
}
