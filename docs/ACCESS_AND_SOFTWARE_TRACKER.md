# Project Software & Access Tracker

**Project:** Will's Walks (willswalks-next)
**Last Updated:** February 2026

---

## Hosting & Deployment

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| Vercel | Next.js hosting & deployment | ✅ Yes | ✅ Yes (deploy token) | ✅ Free tier / Paid | `.vercel` directory in `.gitignore` confirms usage |
| GitHub | Source code repository | ✅ Yes | ✅ Optional (SSH key / PAT) | ✅ Free tier / Paid | `.gitignore` present; likely connected to Vercel for auto-deploy |

**Environment variables (Vercel dashboard):**
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

---

## Database

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| Neon | Serverless PostgreSQL database | ✅ Yes | ✅ Yes (connection string) | ✅ Free tier / Paid | `neonctl` in devDependencies; `@neondatabase/api-client` present |
| Prisma | ORM / database client & migrations | ❌ No account | ❌ No | ❌ No | Local dev tool; `prisma` + `@prisma/client` in dependencies |

**Environment variables:**
- `DATABASE_URL` — Neon PostgreSQL connection string

---

## Authentication

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| NextAuth.js (v4) | User & admin authentication | ❌ No account | ❌ No | ❌ No | Credentials provider (email + password); `@auth/prisma-adapter` for DB sessions |

**Environment variables:**
- `NEXTAUTH_URL` — App URL (e.g. `https://willswalks.co.uk`)
- `NEXTAUTH_SECRET` — Secret key for signing tokens

---

## Email / Notifications

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| WhatsApp (wa.me link) | Customer communication | ❌ No API account | ❌ No | ❌ No | Uses direct `wa.me/44XXXXXXXXXX` link — no API integration |
| Email (hello@willswalks.co.uk) | Contact page display | ✅ Needs Review | ❌ Needs Review | ✅ Needs Review | Displayed as mailto link; no transactional email service detected in code |

> ⚠️ **No transactional email provider** (e.g. Resend, SendGrid, Postmark) detected in dependencies. If you plan to send booking confirmations or password resets via email, you'll need to add one.

---

## Storage

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| — | No file/image storage detected | — | — | — | No S3, Cloudinary, or similar in dependencies |

---

## Analytics / Tracking

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| — | No analytics service detected | — | — | — | No Google Analytics, Plausible, PostHog, etc. in dependencies |

> ⚠️ Consider adding analytics to track website visits and booking conversions.

---

## Payments

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| — | No payment processor detected | — | — | — | No Stripe, PayPal, or similar in dependencies. Bookings record a `price` field but no payment collection |

> ⚠️ If you plan to collect payment online, you'll need to integrate a payment provider (e.g. Stripe).

---

## Domain & DNS

| Service | Used For | Login? | API Key? | Billing? | Notes |
|---------|----------|--------|----------|----------|-------|
| Domain registrar | willswalks.co.uk | ✅ Needs Review | ❌ N/A | ✅ Annual renewal | Check where domain is registered (e.g. Namecheap, Google Domains, Cloudflare) |
| DNS provider | DNS records / pointing to Vercel | ✅ Needs Review | ❌ N/A | ✅ Needs Review | May be managed by registrar or Vercel |

---

## Developer Tools

| Tool | Purpose | Account Needed? | Notes |
|------|---------|-----------------|-------|
| Node.js | JavaScript runtime | ❌ No | Required locally for development |
| npm | Package manager | ❌ No | Comes with Node.js |
| TypeScript | Type-safe JavaScript | ❌ No | v5+ in devDependencies |
| Tailwind CSS | Utility-first CSS framework | ❌ No | v4 in devDependencies |
| ESLint | Code linting | ❌ No | v9 + eslint-config-next |
| neonctl | Neon database CLI | ✅ Yes (Neon account) | v2.20.2 in devDependencies; used for DB management from terminal |
| Prisma CLI | Database migrations & schema management | ❌ No | v6.19.2 in devDependencies |
| bcryptjs | Password hashing | ❌ No | Used for credential auth |
| Zod | Schema validation | ❌ No | v4.3.6 for input validation |

---

## Environment Variables Summary

| Variable | Service | Where to Set |
|----------|---------|--------------|
| `DATABASE_URL` | Neon PostgreSQL | `.env.local` + Vercel dashboard |
| `NEXTAUTH_URL` | NextAuth | `.env.local` + Vercel dashboard |
| `NEXTAUTH_SECRET` | NextAuth | `.env.local` + Vercel dashboard |

---

## Quick Checklist

- [ ] Vercel account — logged in and project connected
- [ ] Neon account — database provisioned and connection string saved
- [ ] GitHub account — repo access and Vercel integration set up
- [ ] Domain registrar — domain renewed and DNS pointing to Vercel
- [ ] Email provider — **not yet set up** (needed for transactional emails)
- [ ] Analytics — **not yet set up**
- [ ] Payment provider — **not yet set up** (if taking online payments)
- [ ] WhatsApp number — update placeholder `44XXXXXXXXXX` with real number
