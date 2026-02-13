import { Prisma } from "@prisma/client";

export const walkerProfileSelect = {
  walkerBio: true,
  walkerServiceArea: true,
  walkerRatePerHour: true,
  walkerAvailability: true,
  walkerExperienceYears: true,
} satisfies Prisma.UserSelect;

export const walkerDashboardUserSelect = {
  role: true,
  walkerApprovalStatus: true,
  name: true,
  email: true,
  ...walkerProfileSelect,
} satisfies Prisma.UserSelect;

export type WalkerProfileFields = Prisma.UserGetPayload<{
  select: typeof walkerProfileSelect;
}>;

export type WalkerDashboardUser = Prisma.UserGetPayload<{
  select: typeof walkerDashboardUserSelect;
}>;

export type WalkerFormAction = (formData: FormData) => Promise<void>;
