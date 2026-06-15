import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
async function create(fd:FormData){ "use server"; await db.coupon.create({ data:{ code: String(fd.get("code")).toUpperCase(), discountType: String(fd.get("type")) as any, discountValue: Number(fd.get("value")) }}); revalidatePath("/admin/coupons")}
export default async function CouponsAdmin(){
  const coupons = await db.coupon.findMany({ orderBy:{ createdAt:"desc"}})
  return <div><h1 className="font-display text-3xl mb-6">Coupons</h1>
  <form action={create} className="bg-card border rounded-2xl p-4 flex gap-2 mb-6"><input name="code" placeholder="CODE" className="border rounded-xl px-3 py-2 bg-background"/><select name="type" className="border rounded-xl px-3 py-2 bg-background"><option value="PERCENTAGE">%</option><option value="FIXED">Fixed</option></select><input name="value" type="number" placeholder="Value" className="border rounded-xl px-3 py-2 bg-background w-28"/><button className="bg-primary text-primary-foreground rounded-full px-4">Add</button></form>
  <div className="bg-card border rounded-2xl p-4"><table className="w-full text-sm"><thead><tr><th className="text-left p-2">Code</th><th>Type</th><th>Value</th><th>Uses</th></tr></thead><tbody>{coupons.map(c=> <tr key={c.id}><td className="p-2">{c.code}</td><td>{c.discountType}</td><td>{c.discountValue}</td><td>{c.usedCount}</td></tr>)}</tbody></table></div></div>
}
