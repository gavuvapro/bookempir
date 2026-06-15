import { db } from "@/lib/db"
import { NextResponse } from "next/server"
export async function POST(req: Request){
  const { code } = await req.json()
  const coupon = await db.coupon.findUnique({ where:{ code: code.toUpperCase() }})
  if(!coupon || !coupon.active) return NextResponse.json({ valid:false }, { status:400 })
  if(coupon.expiresAt && coupon.expiresAt < new Date()) return NextResponse.json({ valid:false }, { status:400 })
  return NextResponse.json({ valid:true, discountType: coupon.discountType, discountValue: coupon.discountValue })
}
