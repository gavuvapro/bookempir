import { db } from "@/lib/db"
export default async function AdminOrders(){
  const orders = await db.order.findMany({ orderBy:{ createdAt:"desc"}, take:50 })
  return <div><h1 className="font-display text-3xl mb-6">Orders</h1>
  <div className="bg-card border rounded-2xl overflow-auto">
  <table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-3">Order</th><th>Email</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>{orders.map(o=> <tr key={o.id} className="border-b"><td className="p-3">{o.orderNumber}</td><td>{o.email}</td><td>${o.total.toFixed(2)}</td><td>{o.status}</td><td>{o.createdAt.toDateString()}</td></tr>)}</tbody></table>
  </div></div>
}
