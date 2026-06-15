"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"
type CartItem = { id: string; title: string; price: number; coverImage: string; slug: string; qty: number }
type CartState = { items: CartItem[]; add: (i: CartItem) => void; remove: (id: string) => void; setQty: (id: string, qty: number) => void; clear: () => void; total: () => number }
export const useCart = create<CartState>()(persist((set, get) => ({
  items: [],
  add: (i) => set(s => { const ex = s.items.find(x=>x.id===i.id); return { items: ex ? s.items.map(x=> x.id===i.id ? {...x, qty: x.qty + i.qty}:x) : [...s.items, i] }}),
  remove: (id) => set(s => ({ items: s.items.filter(x=>x.id!==id)})),
  setQty: (id, qty) => set(s => ({ items: s.items.map(x=> x.id===id ? {...x, qty} : x)})),
  clear: () => set({ items: []}),
  total: () => get().items.reduce((a,b)=>a+b.price*b.qty,0)
}), { name: "authora-cart"}))
