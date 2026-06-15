import { db } from "@/lib/db"
import { auth } from "@/auth"
import { NextResponse } from "next/server"
export async function POST(req: Request){
  const session = await auth(); if(!session) return NextResponse.json({error:"auth"},{status:401})
  const { bookId } = await req.json()
  const userId = (session.user as any).id
  await db.wishlistItem.upsert({ where:{ userId_bookId:{ userId, bookId }}, update:{}, create:{ userId, bookId }})
  return NextResponse.json({ ok:true })
}
