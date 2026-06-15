import { auth } from "@/auth"
import { redirect } from "next/navigation"
export async function requireUser() { const session = await auth(); if (!session?.user) redirect("/login"); return session }
export async function requireAdmin() { const session = await auth(); if ((session?.user as any)?.role !== "ADMIN") redirect("/"); return session }
