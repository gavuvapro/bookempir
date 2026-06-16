# Authora — Premium Personal Book Store

A production-ready, luxury bookstore built for independent authors. Minimal, fast, Apple/Stripe/Gumroad inspired UI.

Live stack: **Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Prisma + PostgreSQL + Auth.js v5 + Stripe + Cloudinary + Resend + Zustand + Framer Motion**

## Features

### Public Storefront
- Premium home: hero, author intro, featured books, testimonials, newsletter, stats
- Books catalog: search, filter by category, sort (newest/price), pagination
- Book detail: gallery, price/comparePrice, stock, ISBN, reviews, related books, add to cart, wishlist
- Categories page
- Blog / Journal with rich content, listing, and single post
- Global search (books + posts)
- About, Contact (with spam-protected API), FAQ (accordion), Privacy, Terms, Shipping, Refunds
- Newsletter signup (Resend ready)
- Cart: persistent (Zustand), quantity update, coupon support API
- Stripe Checkout (hosted), success page, webhook order creation
- Reviews: 1–5 stars, moderated
- Wishlist

### Auth
- Email/password (bcrypt)
- Google OAuth
- Session JWT, RBAC: ADMIN / CUSTOMER
- Protected routes via middleware

### User Dashboard (/account)
- Profile overview
- Order history
- Wishlist view

### Admin CMS (/admin) – Admin only
- Dashboard: revenue, orders, books, customers
- Books CRUD, cover upload via Cloudinary (/api/upload), stock, ISBN, featured flag
- Blog CMS: create/publish posts
- Orders list
- Review moderation (approve)
- Coupon manager: percentage/fixed, expiry
- Newsletter subscriber list in DB

### SEO / Performance
- Dynamic metadata, Open Graph, Twitter cards
- sitemap.ts, robots.ts
- Structured data ready
- next/image remotePatterns for Cloudinary
- Tailwind, SSR, code-split – Lighthouse 95+ target
- Dark / light mode (next-themes)

### Security
- Auth.js CSRF, secure cookies
- Zod validation everywhere
- bcrypt password hashing
- Prisma (SQL injection safe)
- RBAC middleware
- Rate limiting hook ready (add Upstash)
- XSS safe (React)

### Email
- lib/email.ts with Resend
- Welcome / order confirmation templates included
- Plug in RESEND_API_KEY to enable

## Getting Started

1. Clone / copy this folder
2. `npm install`
3. Copy `.env.example` → `.env` and fill:
```
DATABASE_URL=postgresql://...
AUTH_SECRET=$(openssl rand -base64 32)
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
EMAIL_FROM=hello@yourdomain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
4. `npx prisma db push`
5. `npm run db:seed`  →  creates admin@authora.local / admin123, 2 demo books, a blog post, coupon WELCOME10
6. `npm run dev` → http://localhost:3000

Admin: http://localhost:3000/admin

## Project Structure

```
app/
  (site)/  – public storefront
    page.tsx – home
    books/
    blog/
    account/
    cart/, checkout/
    ...
  (auth)/ login, register
  admin/ – CMS
    books/, blog/, orders/, reviews/, coupons/
  api/
    auth/[...nextauth]
    checkout, webhooks/stripe
    reviews, wishlist, newsletter, contact, upload, coupons/validate
components/
  site/ – header, footer, book-card, add-to-cart, review-form, wishlist-button
  ui/ – shadcn (button, input, card, badge, accordion, toaster)
lib/
  db.ts, auth-utils.ts, validators.ts, cart-store.ts, stripe.ts, cloudinary.ts, email.ts, utils.ts, site.ts
prisma/
  schema.prisma – 15 models: User, Account, Session, Book, Category, BlogPost, Review, Order, OrderItem, Coupon, WishlistItem, NewsletterSubscriber, Address, Payment, ContactMessage
```

## Deployment

- **Vercel**: push repo, add env vars, set build command `prisma generate && next build`
- **DB**: Neon PostgreSQL – just set DATABASE_URL and DIRECT_URL
- **Stripe**: add webhook endpoint `/api/webhooks/stripe`
- **Cloudinary**: add credentials for image uploads
- **Resend**: add API key for transactional email

## Customization

Edit `lib/site.ts`:
```ts
export const siteConfig = {
  name: "Authora",
  author: "Elena Vance",
  description: "...",
}
```

Colors / type: Tailwind config – primary is warm amber #E67E22 inspired. Fonts: Inter + Fraunces (display).

## What’s production-complete

✅ All pages from spec, fully responsive
✅ Auth, cart, checkout, orders
✅ Admin CRUD for books/blog/orders/reviews/coupons
✅ Search, reviews, wishlist, newsletter
✅ SEO, sitemap, a11y basics
✅ Prisma schema with all 15 requested models
✅ Stripe, Cloudinary, Resend wired
✅ Clean architecture, TypeScript strict, Zod, Server Actions

## Nice-to-haves / extend

- Password reset / email verification flows – Auth.js email provider is scaffolded, add Resend templates in `lib/email.ts` and the `/api/auth/*` routes (5 min)
- Address manager UI in /account – model exists, API not front-ended yet
- Digital download delivery – `Book.digitalFileUrl` field exists, add secure signed links in order success
- Coupon input in checkout UI – API `/api/coupons/validate` is ready, just add an input component
- Rich text editor: Blog CMS currently uses a textarea. Drop in Novel / Tiptap – `novel` is already in package.json
- Rate limiting: add Upstash Redis, wrap API routes
- Mailchimp sync: newsletter_subscribers table is ready, add a sync job
- Full order status management UI (ship/deliver/cancel) – backend enum exists

All core commerce flows are live and secure. The above are 1–2 hour polish tasks with stubs already in place.

## Scripts

- `npm run dev` – dev
- `npm run build` – production build
- `npm run db:push` – push prisma schema
- `npm run db:seed` – seed demo data
- `npm run db:studio` – Prisma Studio

---

Built with care. MIT.
