import { requireUser } from "@/lib/auth-utils"
import { db } from "@/lib/db"
export default async function Account(){
  const session = await requireUser()
  const orders = await db.order.findMany({ where: { email: session.user.email! }, orderBy:{createdAt:"desc"}, take:10 })
  return <div className="container py-16"><h1 className="font-display text-4xl mb-2">Hi, {session.user.name || "reader"}</h1><p className="text-muted-foreground mb-10">{session.user.email}</p>
  <h2 className="font-display text-2xl mb-4">Recent orders</h2>
  <div className="border rounded-2xl divide-y">{orders.map(o=> <div key={o.id} className="p-4 flex justify-between text-sm"><span>{o.orderNumber} • {o.status}</span><span>${o.total.toFixed(2)}</span></div>)}{orders.length===0 && <div className="p-4 text-muted-foreground text-sm">No orders yet.</div>}</div></div>
}
