<<<<<<< HEAD
<<<<<<< HEAD
# dogwalking
My personal dog walking website/maybe hopefully app
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
=======
# Will's Walks
>>>>>>> 8e72876 (first commit)

Production-grade Next.js app for a dog-walking business with real user auth, bookings, reviews, contact messages, and an admin dashboard.

## Stack

- Next.js App Router + TypeScript
- Auth.js (NextAuth) with Credentials
- Prisma + Postgres
- Tailwind CSS (not heavily used, design uses inline styles)

## Features

- Public marketing site
- Authenticated booking flow with slot locking
- Reviews page (authenticated to post)
- Contact form (stored server-side)
- Admin dashboard (role-protected)
- Server-side data fetching for the homepage

## Project Structure

- Auth config: `src/auth.ts`
- Prisma schema: `prisma/schema.prisma`
- API routes:
  - `src/app/api/bookings/route.ts`
  - `src/app/api/reviews/route.ts`
  - `src/app/api/messages/route.ts`
  - `src/app/api/register/route.ts`
- Pages:
  - `src/app/page.tsx`
  - `src/app/booking/page.tsx`
  - `src/app/reviews/page.tsx`
  - `src/app/contact/page.tsx`
  - `src/app/admin/page.tsx`

## Environment Variables

Set these in `.env` locally and in Vercel/production:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `NEXTAUTH_URL`

Example `.env` values:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"
AUTH_SECRET="replace-with-32+char-secret"
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
```

## Local Setup

1. Install dependencies:

```
npm install
```

2. Set up the database and run migrations:

```
npx prisma migrate dev --name init
```

3. Start the dev server:

```
npm run dev
```

## Create an Admin User

1. Sign up via `/sign-up`.
2. Promote the user in the DB:

<<<<<<< HEAD
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> c4e8b65 (Initial commit from Create Next App)
=======
```
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

## Booking Slot Protection

Booking slots are protected by a unique DB constraint on `(date, timeSlot)` to prevent double bookings.

## Deployment (Recommended)

- Frontend: Vercel
- Database: Neon (or Supabase)

On Vercel:

1. Set the environment variables listed above.
2. Run migrations at deploy time:

```
npx prisma migrate deploy
```

## Notes

- Booking and review creation require a signed-in user.
- Admin dashboard is protected by the `ADMIN` role and middleware.
>>>>>>> 8e72876 (first commit)
