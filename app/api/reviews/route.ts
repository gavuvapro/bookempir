import { db } from "@/lib/db"
import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { ReviewSchema } from "@/lib/validators"
export async function POST(req: Request){
  const session = await auth()
  if (!session?.user) return NextResponse.json({error:"auth"}, {status:401})
  const { bookId, rating, comment } = await req.json()
  const parsed = ReviewSchema.safeParse({ rating, comment })
  if(!parsed.success) return NextResponse.json({error:"invalid"}, {status:400})
  const userId = (session.user as any).id
  await db.review.upsert({
    where: { userId_bookId: { userId, bookId }},
    update: { rating, comment, approved: false },
    create: { userId, bookId, rating, comment }
  })
  return NextResponse.json({ ok:true })
}
