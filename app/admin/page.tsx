import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
export default async function AdminHome(){
  const [books, orders, customers, revenue] = await Promise.all([
    db.book.count(), db.order.count(), db.user.count({ where:{ role:"CUSTOMER"}}), db.order.aggregate({_sum:{total:true}, _count:true})
  ])
  return <div>
    <h1 className="font-display text-3xl mb-6">Dashboard</h1>
    <div className="grid md:grid-cols-4 gap-4">
      <Card><CardHeader><CardTitle>${(revenue._sum.total||0).toFixed(2)}</CardTitle></CardHeader><CardContent>Total revenue</CardContent></Card>
      <Card><CardHeader><CardTitle>{orders}</CardTitle></CardHeader><CardContent>Orders</CardContent></Card>
      <Card><CardHeader><CardTitle>{books}</CardTitle></CardHeader><CardContent>Books</CardContent></Card>
      <Card><CardHeader><CardTitle>{customers}</CardTitle></CardHeader><CardContent>Customers</CardContent></Card>
    </div>
    <div className="mt-8 bg-card border rounded-2xl p-6">Revenue chart placeholder — Recharts ready. Connect your analytics here.</div>
  </div>
}
