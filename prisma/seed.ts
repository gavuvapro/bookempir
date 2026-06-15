import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
const db = new PrismaClient()
async function main(){
  const cat = await db.category.upsert({ where:{ slug:"design"}, update:{}, create:{ name:"Design", slug:"design", description:"Design books"}})
  await db.user.upsert({ where:{ email:"admin@authora.local"}, update:{}, create:{ email:"admin@authora.local", name:"Admin", role:"ADMIN", password: await bcrypt.hash("admin123",10) }})
  const books = [
    { title:"Slow Design Systems", slug:"slow-design-systems", description:"A calm, practical guide to design systems that last.", price:29, coverImage:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80", categoryId: cat.id, featured:true, stock:100 },
    { title:"The Quiet Studio", slug:"the-quiet-studio", description:"Routines for creative work.", price:24, coverImage:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80", categoryId: cat.id, featured:true, stock:50 },
  ]
  for(const b of books){ await db.book.upsert({ where:{ slug:b.slug }, update:{}, create:b as any })}
  await db.blogPost.upsert({ where:{ slug:"hello-world"}, update:{}, create:{ title:"Designing with intention", slug:"hello-world", excerpt:"A short note on starting.", content:"Welcome to the journal.", published:true, publishedAt: new Date() }})
  await db.coupon.upsert({ where:{ code:"WELCOME10"}, update:{}, create:{ code:"WELCOME10", discountType:"PERCENTAGE", discountValue:10 }})
  console.log("Seeded. Admin login: admin@authora.local / admin123")
}
main()
