import { z } from "zod"
export const BookSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  comparePrice: z.coerce.number().optional(),
  isbn: z.string().optional(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string(),
  coverImage: z.string().url(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
})
export const ReviewSchema = z.object({ rating: z.number().min(1).max(5), comment: z.string().min(3) })
export const ContactSchema = z.object({ name: z.string().min(2), email: z.string().email(), subject: z.string().min(3), message: z.string().min(10) })
export const NewsletterSchema = z.object({ email: z.string().email() })
