# Dog Breeds Full Feature Checkpoint

Date: 2026-02-13

## Completed in this pass

### 1) Drag-and-drop ordering (Admin)

- UI drag reorder list + save button:
  - `src/app/admin/dog-breeds/AdminDogBreedsManager.tsx`
- API endpoint that persists full order to `displayOrder`:
  - `src/app/api/admin/dog-breeds/reorder/route.ts`

### 2) CSV import/export (Admin)

- Export CSV endpoint:
  - `src/app/api/admin/dog-breeds/export/route.ts`
- Import CSV endpoint (upsert by `slug`):
  - `src/app/api/admin/dog-breeds/import/route.ts`
- Admin UI controls for CSV import/export:
  - `src/app/admin/dog-breeds/AdminDogBreedsManager.tsx`

### 3) Image upload flow (Admin)

- Upload endpoint (multipart) saves images to:
  - `public/uploads/dog-breeds/`
  - route: `src/app/api/admin/dog-breeds/upload-image/route.ts`
- Admin UI upload button auto-fills `imageUrl`:
  - `src/app/admin/dog-breeds/AdminDogBreedsManager.tsx`
- Upload directory is ignored in git:
  - `.gitignore` includes `/public/uploads`

### 4) Public breed detail pages

- New page route:
  - `src/app/dog-breeds/[slug]/page.tsx`
- Dictionary bubble now links to full profile:
  - `src/app/dog-breeds/BreedDictionary.tsx`
- Sitemap includes breed detail URLs:
  - `src/app/sitemap.ts`

## Supporting architecture

- Admin auth helper:
  - `src/lib/admin-auth.ts`
- DB-backed public data loader with fallback to code defaults:
  - `src/lib/dog-breeds.server.ts`
- Admin wrapper page now loads client manager component:
  - `src/app/admin/dog-breeds/page.tsx`
- Main breed CRUD endpoint:
  - `src/app/api/admin/dog-breeds/route.ts`
- Import defaults endpoint:
  - `src/app/api/admin/dog-breeds/import-defaults/route.ts`

## Database notes

- `DogBreed` model exists in Prisma schema:
  - `prisma/schema.prisma`
- Migration file:
  - `prisma/migrations/20260213144000_add_dog_breeds/migration.sql`

## Run after reopen

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

(Use `npx prisma migrate deploy` instead of `migrate dev` for deployed environments.)

## Validation status

- `npx prisma generate` passed
- `npm run lint` passed
- `npm run build` passed

## Add-on implemented after this checkpoint

- Walker role registration path is now wired:
  - Prisma enum includes `WALKER`
  - Sign-up UI includes account type selection (`Dog Owner` / `Walker`)
  - `/api/register` can create walker accounts (safe, no admin escalation)
  - New auth-protected walker landing page: `/walker`
