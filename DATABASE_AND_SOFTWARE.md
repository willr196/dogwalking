# Database and Software Used

This project is a Next.js app for Will's Walks. It uses a PostgreSQL database through Prisma, with NextAuth for account sessions and a small set of API routes for bookings, messages, reviews, calendar export, registration, and dog-breed admin tools.

## Database

### PostgreSQL

The app database is PostgreSQL. The connection is configured through the `DATABASE_URL` environment variable.

PostgreSQL stores the live app data:

- user accounts
- login sessions
- email verification tokens
- dog-walking bookings
- customer reviews
- contact messages
- dog-breed dictionary entries

### Prisma

Prisma is the database ORM used by the app.

Relevant files:

- `prisma/schema.prisma` defines the database tables and relationships.
- `prisma/migrations/` contains the database migration history.
- `prisma.config.ts` points Prisma at the schema and migration folder.
- `src/lib/prisma.ts` creates the shared Prisma client used by API routes and server code.

The Prisma client is cached in development so hot reloads do not create too many database connections.

## Database Models

### `User`

Stores registered users, walkers, and admins.

Important fields:

- `email`, `name`, `passwordHash`
- `role`: `USER`, `WALKER`, or `ADMIN`
- `walkerApprovalStatus`: tracks whether walker accounts are pending, approved, or rejected
- walker profile fields such as bio, service area, rate, availability, and experience

Users can have bookings, reviews, messages, sessions, and auth accounts.

### `Account`, `Session`, and `VerificationToken`

These support NextAuth and email verification.

- `Account` stores provider account data.
- `Session` stores session records.
- `VerificationToken` stores temporary email verification tokens.

### `Booking`

Stores booking requests and confirmed meet-and-greet slots.

Important fields:

- owner contact details
- dog details
- date and time slot
- notes
- price
- booking status

There is a unique constraint on `date` and `timeSlot` so the same slot cannot be booked twice.

### `Review`

Stores customer reviews shown by the app.

### `Message`

Stores contact form or booking-related messages.

### `DogBreed`

Stores public dog-breed dictionary content.

Important fields:

- `slug`
- `name`
- `size`
- `category`
- care notes such as temperament, exercise, coat care, ideal home, and note
- optional `imageUrl`
- `isActive`
- `displayOrder`

The public breed pages fall back to local generated placeholder artwork when no stable breed image is available.

## Main Software Stack

### Next.js

Next.js is the web framework. It handles:

- app routes under `src/app`
- server-rendered pages
- API routes under `src/app/api`
- static generation for public pages
- production builds
- security headers from `next.config.ts`

Current package version: `next@15.1.11`.

### React

React powers the UI components.

Current package versions:

- `react@18.2.0`
- `react-dom@18.2.0`

### TypeScript

TypeScript is used for app code, API routes, Prisma types, and safer refactoring.

Main commands:

- `npm run typecheck`
- `npm run build`

### NextAuth

NextAuth handles authentication.

Relevant files:

- `src/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`

The app currently uses credentials login with email and password. Passwords are hashed before storage, and login requires verified email. Walker accounts also require approval before sign-in.

### bcryptjs

`bcryptjs` hashes passwords during registration and compares passwords during login.

### Zod

Zod validates API input for routes such as:

- registration
- bookings
- messages
- reviews
- dog-breed admin actions

### Tailwind CSS

Tailwind CSS is used for utility styling.

Relevant files:

- `tailwind.config.js`
- `postcss.config.js`
- `src/app/globals.css`

The project also has custom CSS variables and shared component classes for the Will's Walks visual style.

## App Features Backed By Software

### Booking Flow

Bookings are handled through API routes and Prisma. Booking notification email code currently logs the notification details and is ready to be replaced with a real email provider.

Relevant files:

- `src/app/api/bookings/route.ts`
- `src/lib/notifications.ts`

### Email Verification

Registration creates a verification token in the database. The current email sender logs the verification link and is structured so a provider such as Resend, SendGrid, or Nodemailer can be added later.

Relevant files:

- `src/app/api/register/route.ts`
- `src/app/api/verify-email/route.ts`
- `src/lib/email-verification.ts`

### Calendar Export

The app can generate an `.ics` calendar feed for future confirmed bookings. Access is restricted to authenticated owner/admin usage.

Relevant file:

- `src/app/api/calendar/route.ts`

### Dog Breed Admin

The dog-breed dictionary can be managed through admin API routes. Prisma stores active breeds, ordering, images, categories, and care notes.

Relevant routes:

- `src/app/api/admin/dog-breeds/route.ts`
- `src/app/api/admin/dog-breeds/import/route.ts`
- `src/app/api/admin/dog-breeds/import-defaults/route.ts`
- `src/app/api/admin/dog-breeds/reorder/route.ts`
- `src/app/api/admin/dog-breeds/upload-image/route.ts`

## Environment Variables

The local `.env` file is intentionally ignored by Git and should not be committed.

Environment variables currently used by the project include:

- `DATABASE_URL`: PostgreSQL connection string for Prisma.
- `AUTH_SECRET`: secret used by Auth.js / NextAuth.
- `AUTH_URL` / `NEXTAUTH_URL`: app URL used by authentication and verification links.
- `NEXT_PUBLIC_CALENDLY_URL`: optional public calendar scheduling URL.
- `BOOKING_NOTIFICATION_EMAIL`: optional owner email used for notifications and calendar access.

Some optional variables are referenced in code even if they are not currently present in the local `.env`.

## Development Tools

### npm

npm is used for scripts and dependency management.

Common commands:

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run start
```

### ESLint

ESLint checks code quality and framework-specific Next.js rules.

Command:

```bash
npm run lint
```

### Prisma CLI

The Prisma CLI manages schema changes, migrations, and generated client code.

Typical commands:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

### Git and GitHub

Git tracks the codebase, and GitHub is the remote repository.

Remote:

```text
https://github.com/willr196/dogwalking.git
```

### Headless Chrome

Headless Chrome was used for visual QA screenshots during development. It is not required by the production app.

## Notes

- There is no committed Docker, Fly.io, Vercel, or Netlify config in this repository.
- Email sending is prepared in code but currently uses console logging placeholders.
- The database provider is PostgreSQL. The actual hosted database depends on the `DATABASE_URL` value.
