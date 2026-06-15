"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export function ReviewForm({ bookId }:{ bookId:string }){
  const [rating,setRating]=useState(5)
  const [comment,setComment]=useState("")
  const submit = async ()=> {
    const r = await fetch("/api/reviews", { method:"POST", headers:{ "Content-Type":"application/json"}, body: JSON.stringify({ bookId, rating, comment })})
    if(r.ok){ toast.success("Review submitted for moderation"); setComment("") } else toast.error("Sign in to review")
  }
  return <div className="border rounded-2xl p-4 mt-6 max-w-xl">
    <div className="font-medium mb-2">Leave a review</div>
    <select value={rating} onChange={e=>setRating(Number(e.target.value))} className="border rounded-xl px-3 py-2 bg-background mb-2"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
    <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Your thoughts…" className="w-full border rounded-xl p-3 bg-background min-h-[90px]"/>
    <Button onClick={submit} size="sm" className="mt-2">Submit</Button>
  </div>
}
