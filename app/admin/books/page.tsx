import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default async function AdminBooks(){
  const books = await db.book.findMany({ orderBy:{ createdAt:"desc"}, include:{ category:true }})
  return <div>
    <div className="flex justify-between items-center mb-6"><h1 className="font-display text-3xl">Books</h1><Link href="/admin/books/new"><Button>New Book</Button></Link></div>
    <div className="bg-card border rounded-2xl overflow-auto">
      <table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-3">Title</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
      <tbody>{books.map(b=> <tr key={b.id} className="border-b last:border-0"><td className="p-3">{b.title}</td><td>{b.category.name}</td><td>${b.price}</td><td>{b.stock}</td><td className="p-3 text-right"><Link className="underline" href={`/admin/books/${b.id}`}>Edit</Link></td></tr>)}</tbody></table>
    </div>
  </div>
}
