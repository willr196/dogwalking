DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'WalkerApprovalStatus'
  ) THEN
    CREATE TYPE "WalkerApprovalStatus" AS ENUM (
      'NOT_APPLICABLE',
      'PENDING',
      'APPROVED',
      'REJECTED'
    );
  END IF;
END $$;

ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "walkerApprovalStatus" "WalkerApprovalStatus" NOT NULL DEFAULT 'NOT_APPLICABLE';

UPDATE "User"
SET "walkerApprovalStatus" = 'APPROVED'
WHERE "role" = 'WALKER'
  AND "walkerApprovalStatus" = 'NOT_APPLICABLE';
