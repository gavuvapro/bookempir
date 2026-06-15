import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { BookSchema } from "@/lib/validators"
async function createBook(formData: FormData){
  "use server"
  const raw = Object.fromEntries(formData)
  const data = BookSchema.parse({ ...raw, price: Number(raw.price), stock: Number(raw.stock), featured: raw.featured === "on", published: raw.published !== "off" })
  await db.book.create({ data })
  redirect("/admin/books")
}
export default async function NewBook(){
  const categories = await db.category.findMany()
  return <div><h1 className="font-display text-3xl mb-6">New Book</h1>
  <form action={createBook} className="bg-card border rounded-2xl p-6 grid md:grid-cols-2 gap-4 max-w-3xl">
    <input name="title" placeholder="Title" className="border rounded-xl px-3 py-2 bg-background" required />
    <input name="slug" placeholder="slug" className="border rounded-xl px-3 py-2 bg-background" required />
    <input name="price" type="number" step="0.01" placeholder="Price" className="border rounded-xl px-3 py-2 bg-background" required />
    <input name="stock" type="number" placeholder="Stock" className="border rounded-xl px-3 py-2 bg-background" required />
    <input name="coverImage" placeholder="Cover image URL (Cloudinary)" className="border rounded-xl px-3 py-2 bg-background md:col-span-2" required />
    <select name="categoryId" className="border rounded-xl px-3 py-2 bg-background" required>{categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}</select>
    <input name="isbn" placeholder="ISBN (optional)" className="border rounded-xl px-3 py-2 bg-background" />
    <textarea name="description" placeholder="Description" className="border rounded-xl px-3 py-2 bg-background md:col-span-2 min-h-[120px]" required />
    <label className="text-sm flex gap-2 items-center"><input type="checkbox" name="featured" /> Featured</label>
    <label className="text-sm flex gap-2 items-center"><input type="checkbox" name="published" defaultChecked /> Published</label>
    <button className="bg-primary text-primary-foreground rounded-full px-5 py-2.5">Save</button>
  </form></div>
}
