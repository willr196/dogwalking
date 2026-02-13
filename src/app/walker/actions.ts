"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getWalkerSignInCode, isWalkerApproved } from "@/lib/walker-approval";

function parseOptionalString(
  value: FormDataEntryValue | null,
  maxLength: number
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function parseOptionalInt(
  value: FormDataEntryValue | null,
  min: number,
  max: number
): number | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

export async function saveWalkerProfileAction(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, walkerApprovalStatus: true },
  });

  if (!currentUser || currentUser.role !== "WALKER") {
    redirect("/");
  }

  if (!isWalkerApproved(currentUser.walkerApprovalStatus)) {
    const code = getWalkerSignInCode(currentUser.walkerApprovalStatus);
    redirect(`/sign-in?error=CredentialsSignin&code=${code}`);
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      walkerServiceArea: parseOptionalString(formData.get("walkerServiceArea"), 140),
      walkerRatePerHour: parseOptionalInt(formData.get("walkerRatePerHour"), 5, 250),
      walkerExperienceYears: parseOptionalInt(
        formData.get("walkerExperienceYears"),
        0,
        60
      ),
      walkerAvailability: parseOptionalString(formData.get("walkerAvailability"), 600),
      walkerBio: parseOptionalString(formData.get("walkerBio"), 1200),
    },
  });

  redirect("/walker?saved=true");
}
