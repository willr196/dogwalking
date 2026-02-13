# Walker Approval Workflow Checkpoint

## Date
- February 13, 2026

## What is implemented
- Walker approval status is now tracked in the database.
- New walker signups are created as `PENDING`.
- Admin can approve/reject walker accounts from the main admin dashboard.
- Admin can filter walker applications by `all`, `pending`, `approved`, and `rejected`.
- Credentials login now blocks walkers unless they are `APPROVED`.
- Sign-in shows specific messages for:
  - unverified email
  - walker pending approval
  - walker rejected
- Walker dashboard route (`/walker`) now verifies current DB status before allowing access.
- Walker dashboard now includes editable profile fields:
  - service area
  - hourly rate
  - experience years
  - availability
  - bio
- Public walker directory page is live at `/walkers`:
  - only approved walkers are shown
  - profile cards include small image (or initials fallback), area, availability, rate, experience, and bio
  - linked in navbar and sitemap
- Registration now creates and sends an email verification token before first sign-in.

## Database changes
- Prisma schema updates in `prisma/schema.prisma`:
  - Added enum: `WalkerApprovalStatus`
    - `NOT_APPLICABLE`
    - `PENDING`
    - `APPROVED`
    - `REJECTED`
  - Added field on `User`:
    - `walkerApprovalStatus WalkerApprovalStatus @default(NOT_APPLICABLE)`

- SQL migration added:
  - `prisma/migrations/20260213173000_add_walker_approval_status/migration.sql`
  - Creates enum/type if missing.
  - Adds `User.walkerApprovalStatus` column with default.
  - Backfills existing `WALKER` users from `NOT_APPLICABLE` to `APPROVED`.
- Additional SQL migration added:
  - `prisma/migrations/20260213190000_add_walker_profile_fields/migration.sql`
  - Adds nullable profile fields on `User`:
    - `walkerBio`
    - `walkerServiceArea`
    - `walkerRatePerHour`
    - `walkerAvailability`
    - `walkerExperienceYears`

## App/API/Auth changes
- `src/app/api/register/route.ts`
  - Sets walker signup status to `PENDING`.
  - Non-walker signup gets `NOT_APPLICABLE`.
  - Creates verification token and sends verification link.
  - Rolls back newly created user if verification setup fails.

- `src/auth.ts`
  - Added custom credentials errors:
    - `email_not_verified`
    - `walker_pending`
    - `walker_rejected`
  - Blocks walker login unless status is `APPROVED`.

- `src/app/(auth)/sign-in/page.tsx`
  - Maps NextAuth credential error code to user-facing message.
  - Displays verification success message (`?verified=true`).
  - Displays registration-success verification prompt (`?registered=true`).

- `src/app/(auth)/sign-up/page.tsx`
  - After signup, redirects to sign-in with `registered=true` instead of auto sign-in attempt.

- `src/app/admin/page.tsx`
  - Added walker applications section.
  - Added approve/reject server actions.
  - Added pending walker stat.
  - Added walker status filter chips with per-status counts.

- `src/app/walker/page.tsx`
  - Checks live DB role/status by user ID.
  - Redirects non-approved walkers back to sign-in with proper code.
  - Added secure server action for walker self-profile updates.
  - Added editable walker profile form and save-state feedback.

- `src/lib/walkers.server.ts`
  - Added server helper to return approved walker profiles for public display.

- `src/app/walkers/page.tsx`
  - Added public “Find a Walker” page and profile card UI.

- `src/components/willswalks/NavBar.tsx`
  - Added “Find a Walker” link on desktop and mobile menus.

- `src/app/sitemap.ts`
  - Added `/walkers` URL to sitemap.

- `src/lib/email-verification.ts`
  - Token creation now replaces existing tokens for the same email cleanly.

- `src/lib/walker-approval.ts`
  - Added shared helpers for walker approval checks and sign-in code mapping.

## Validation run
- `npx prisma generate` ✅
- `npm run typecheck` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Refactor cleanup (post incremental additions)
- Sign-in route was refactored into server + client split:
  - `src/app/(auth)/sign-in/page.tsx` now parses query params server-side.
  - `src/app/(auth)/sign-in/SignInClient.tsx` owns only interactive form behavior/UI.
  - Shared error mapping moved to `src/lib/sign-in-errors.ts`.
- `src/auth.ts` credentials lookup now selects only required user fields.
- `src/app/admin/page.tsx` walker status UI logic was deduplicated:
  - filter-chip rendering now uses a config array
  - status badge class/label logic extracted to helpers
- `src/app/walker/page.tsx` deduplicated walker sign-in error code mapping.
- `src/app/admin/page.tsx` admin server actions now redirect to `/sign-in` on lost/invalid admin session instead of throwing a generic error.
- Removed stale unused file: `src/app/admin/AdminTabs.tsx`.
- Restored shared `ww-*` style primitives in `src/app/globals.css` and added Tailwind `@theme` tokens for `ww-*` color/shadow utilities used across pages.
- Third pass extraction split large route files into focused modules:
  - Admin:
    - `src/app/admin/page.tsx` now handles auth/data orchestration only.
    - Server actions moved to `src/app/admin/actions.ts`.
    - Walker filter/status helpers moved to `src/app/admin/lib.ts`.
    - Section components moved to `src/app/admin/components/*`.
    - Shared admin view types moved to `src/app/admin/types.ts`.
  - Walker:
    - `src/app/walker/page.tsx` now handles auth/data orchestration only.
    - Save profile server action moved to `src/app/walker/actions.ts`.
    - Walker profile form + summary + CTA links moved to `src/app/walker/components/*`.
    - Shared walker dashboard types moved to `src/app/walker/types.ts`.
- Fourth pass targeted cleanup (types + consistency):
  - Replaced manual payload casts in admin/walker pages with Prisma `select`-derived types:
    - `src/app/admin/types.ts` now exports `admin*Select` objects and payload types.
    - `src/app/walker/types.ts` now exports `walkerDashboardUserSelect` and payload types.
  - Added shared action signatures:
    - `AdminFormAction` in `src/app/admin/types.ts`
    - `WalkerFormAction` in `src/app/walker/types.ts`
  - Tightened NextAuth typing:
    - Added JWT module augmentation in `src/types/next-auth.d.ts`.
    - Removed broad role/id casts from `src/auth.ts` callbacks.
  - Removed remaining enum casts in dog-breed helpers/UI:
    - `src/lib/dog-breeds.server.ts` now uses explicit type guards.
    - `src/app/admin/dog-breeds/AdminDogBreedsManager.tsx` now uses typed parsers and typed JSON response helpers.
  - Signup/signin client submit handlers now trim email/name inputs and use `try/finally` for consistent loading-state cleanup.
  - Added stable TypeScript check config:
    - `tsconfig.typecheck.json`
    - `npm run typecheck` now targets this file to avoid `.next/types` race issues.

## Quick test flow
1. Sign up as walker.
2. Confirm sign-in page shows registration/verification-required message.
3. Verify email via `/api/verify-email?token=...` link from server log output.
4. Try to sign in as that walker.
5. Confirm sign-in shows "pending approval" message.
6. Sign in as admin and open `/admin`.
7. In "Walker Applications", approve the walker.
8. Sign in again as walker and confirm access to `/walker`.
9. Update walker profile fields and save.
10. Confirm success banner and persisted values on reload.
11. Open `/walkers` and confirm the walker appears after approval with profile details.

## Next good coding steps
- Surface walker profile fields in the admin walker list (read-only card details).
- Add optional avatar upload for walker profiles (instead of initials fallback).
- Add optional approval notes + timestamp + approver ID.
- Add email notifications for approval/rejection state changes.
