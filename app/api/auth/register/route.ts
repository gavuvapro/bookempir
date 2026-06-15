import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
export async function POST(req: Request){
  const { name, email, password } = await req.json()
  const exists = await db.user.findUnique({ where: { email }})
  if (exists) return NextResponse.json({ error: "Exists" }, { status: 400 })
  const hash = await bcrypt.hash(password, 10)
  await db.user.create({ data: { name, email, password: hash }})
  return NextResponse.json({ ok: true })
}
