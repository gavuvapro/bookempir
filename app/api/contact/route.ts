import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { ContactSchema } from "@/lib/validators"
export async function POST(req: Request){
  const body = await req.json()
  const parsed = ContactSchema.safeParse(body)
  if(!parsed.success) return NextResponse.json({error:"Invalid"}, {status:400})
  await db.contactMessage.create({ data: parsed.data })
  return NextResponse.json({ ok:true })
}
