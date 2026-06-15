import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (creds) => {
        const parsed = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(creds)
        if (!parsed.success) return null
        const { email, password } = parsed.data
        const user = await db.user.findUnique({ where: { email }})
        if (!user || !user.password) return null
        
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error("Account is locked due to too many failed attempts. Try again later.")
        }

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) {
          const newAttempts = user.failedLoginAttempts + 1;
          await db.user.update({
            where: { id: user.id },
            data: { 
              failedLoginAttempts: newAttempts,
              lockedUntil: newAttempts >= MAX_LOGIN_ATTEMPTS ? new Date(Date.now() + LOCKOUT_DURATION) : null
            }
          })
          return null
        }

        if (user.failedLoginAttempts > 0) {
          await db.user.update({
            where: { id: user.id },
            data: { failedLoginAttempts: 0, lockedUntil: null }
          })
        }

        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    session({ session, token }) {
      if (token.sub) (session.user as any).id = token.sub
      ;(session.user as any).role = token.role
      return session
    }
  }
})
