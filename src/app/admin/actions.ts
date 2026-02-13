"use server";

import { WalkerApprovalStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function ensureAdminAction() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/sign-in");
  }
}

function parseWalkerApprovalStatus(
  value: FormDataEntryValue | null
): WalkerApprovalStatus | null {
  if (value === WalkerApprovalStatus.PENDING) {
    return WalkerApprovalStatus.PENDING;
  }
  if (value === WalkerApprovalStatus.APPROVED) {
    return WalkerApprovalStatus.APPROVED;
  }
  if (value === WalkerApprovalStatus.REJECTED) {
    return WalkerApprovalStatus.REJECTED;
  }
  return null;
}

export async function cancelBookingAction(formData: FormData) {
  await ensureAdminAction();

  const id = formData.get("id")?.toString();
  if (!id) return;

  await prisma.booking.update({ where: { id }, data: { status: "cancelled" } });
  revalidatePath("/admin");
}

export async function deleteReviewAction(formData: FormData) {
  await ensureAdminAction();

  const id = formData.get("id")?.toString();
  if (!id) return;

  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function deleteMessageAction(formData: FormData) {
  await ensureAdminAction();

  const id = formData.get("id")?.toString();
  if (!id) return;

  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function updateWalkerApprovalStatusAction(formData: FormData) {
  await ensureAdminAction();

  const id = formData.get("id")?.toString();
  const status = parseWalkerApprovalStatus(formData.get("status"));
  if (!id || !status) {
    return;
  }

  await prisma.user.updateMany({
    where: { id, role: "WALKER" },
    data: { walkerApprovalStatus: status },
  });

  revalidatePath("/admin");
}
