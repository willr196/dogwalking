import { Prisma } from "@prisma/client";

export const adminBookingSelect = {
  id: true,
  ownerName: true,
  email: true,
  phone: true,
  dogName: true,
  dogBreed: true,
  dogSize: true,
  date: true,
  timeSlot: true,
  notes: true,
  price: true,
  status: true,
} satisfies Prisma.BookingSelect;

export const adminReviewSelect = {
  id: true,
  name: true,
  dogName: true,
  rating: true,
  text: true,
} satisfies Prisma.ReviewSelect;

export const adminMessageSelect = {
  id: true,
  name: true,
  email: true,
  message: true,
  createdAt: true,
} satisfies Prisma.MessageSelect;

export const adminWalkerSelect = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  createdAt: true,
  walkerApprovalStatus: true,
} satisfies Prisma.UserSelect;

export type AdminBooking = Prisma.BookingGetPayload<{
  select: typeof adminBookingSelect;
}>;

export type AdminReview = Prisma.ReviewGetPayload<{
  select: typeof adminReviewSelect;
}>;

export type AdminMessage = Prisma.MessageGetPayload<{
  select: typeof adminMessageSelect;
}>;

export type AdminWalker = Prisma.UserGetPayload<{
  select: typeof adminWalkerSelect;
}>;

export type AdminFormAction = (formData: FormData) => Promise<void>;

export type AdminStat = {
  label: string;
  value: string | number;
  color: string;
};
