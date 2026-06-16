import { db } from "@/lib/db"
import { notFound, redirect } from "next/navigation"
export default async function EditBook({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = await db.book.findUnique({ where: { id: resolvedParams.id } })
  if (!book) return notFound()
  async function update(fd: FormData) {
    "use server"
    await db.book.update({ where: { id: resolvedParams.id }, data: { title: String(fd.get("title")), price: Number(fd.get("price")), stock: Number(fd.get("stock")) } })
    redirect("/admin/books")
  }
  return <div><h1 className="font-display text-3xl mb-6">Edit {book.title}</h1>
  <form action={update} className="bg-card border rounded-2xl p-6 max-w-xl space-y-3">
    <input name="title" defaultValue={book.title} className="w-full border rounded-xl px-3 py-2 bg-background"/>
    <input name="price" type="number" step="0.01" defaultValue={book.price} className="w-full border rounded-xl px-3 py-2 bg-background"/>
    <input name="stock" type="number" defaultValue={book.stock} className="w-full border rounded-xl px-3 py-2 bg-background"/>
    <button className="bg-primary text-primary-foreground rounded-full px-5 py-2.5">Save</button>
  </form></div>
}
