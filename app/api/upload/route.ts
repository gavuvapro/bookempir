import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { auth } from "@/auth"
export async function POST(req: Request){
  const session = await auth()
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({error:"forbidden"}, {status:403})
  const form = await req.formData()
  const file = form.get("file") as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const result: any = await new Promise((resolve, reject)=>{
    cloudinary.uploader.upload_stream({ folder: "authora" }, (err, res)=> err?reject(err):resolve(res)).end(buffer)
  })
  return NextResponse.json({ url: result.secure_url })
}
