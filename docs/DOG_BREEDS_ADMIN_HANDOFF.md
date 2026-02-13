# Dog Breeds Admin Handoff

Dog breeds are now fully manageable from admin, with API-backed tools and public detail pages.

## Core features live

- Admin manager at `/admin/dog-breeds` now supports:
  - Full CRUD (create, edit, delete)
  - Drag-and-drop ordering + save
  - CSV export
  - CSV import (upsert by slug)
  - Image upload (stores files under `public/uploads/dog-breeds`)
  - Import defaults (seed from code list)
- Public dictionary at `/dog-breeds` uses DB records when available.
- Public detail pages at `/dog-breeds/[slug]` are live.
- Sitemap now includes breed detail URLs.

## Key files

- Prisma model + migration:
  - `prisma/schema.prisma`
  - `prisma/migrations/20260213144000_add_dog_breeds/migration.sql`
- Admin UI:
  - `src/app/admin/dog-breeds/page.tsx`
  - `src/app/admin/dog-breeds/AdminDogBreedsManager.tsx`
- Admin API routes:
  - `src/app/api/admin/dog-breeds/route.ts`
  - `src/app/api/admin/dog-breeds/reorder/route.ts`
  - `src/app/api/admin/dog-breeds/import-defaults/route.ts`
  - `src/app/api/admin/dog-breeds/export/route.ts`
  - `src/app/api/admin/dog-breeds/import/route.ts`
  - `src/app/api/admin/dog-breeds/upload-image/route.ts`
- Public pages + data layer:
  - `src/app/dog-breeds/page.tsx`
  - `src/app/dog-breeds/BreedDictionary.tsx`
  - `src/app/dog-breeds/[slug]/page.tsx`
  - `src/lib/dog-breeds.server.ts`
  - `src/lib/dog-breeds.ts`
- Supporting updates:
  - `src/app/sitemap.ts`
  - `src/app/admin/page.tsx`
  - `.gitignore` (`/public/uploads`)

## Runtime behavior

- Source priority for public breeds:
  1. `DogBreed` DB table (`isActive = true`)
  2. Fallback to `src/lib/dog-breeds.ts` if DB empty/unavailable
- CSV import upserts by `slug`.
- Drag reorder writes `displayOrder` for every row.
- Upload endpoint writes image files to local filesystem:
  - `/public/uploads/dog-breeds/...`

## Commands after reopening

1. Generate client:

```bash
npx prisma generate
```

2. Apply migration:

Local/dev:

```bash
npx prisma migrate dev
```

Deployed env:

```bash
npx prisma migrate deploy
```

3. Start app:

```bash
npm run dev
```

4. Open and use:

- `http://localhost:3000/admin/dog-breeds`
- Optional first step: click **Import default breeds**

## Quick smoke test

- `/admin/dog-breeds` loads for ADMIN user
- Create a breed and save
- Edit a breed and save
- Delete a breed
- Drag rows, click save order, refresh page and confirm order persists
- Export CSV, edit one row, import CSV, confirm update
- Upload an image from form and verify URL + preview
- Visit `/dog-breeds` and `/dog-breeds/[slug]` for updated content

## Last checks run

- `npx prisma generate` passed
- `npm run lint` passed
- `npm run build` passed
