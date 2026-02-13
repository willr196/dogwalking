import { prisma } from "@/lib/prisma";

export type PublicWalkerProfile = {
  id: string;
  name: string | null;
  image: string | null;
  walkerBio: string | null;
  walkerServiceArea: string | null;
  walkerRatePerHour: number | null;
  walkerAvailability: string | null;
  walkerExperienceYears: number | null;
  updatedAt: Date;
};

/**
 * Returns approved walker profiles for the public directory page.
 * If the query fails, return an empty list so the page still renders.
 */
export async function getApprovedWalkersForPublicDirectory(): Promise<PublicWalkerProfile[]> {
  try {
    return await prisma.user.findMany({
      where: {
        role: "WALKER",
        walkerApprovalStatus: "APPROVED",
      },
      select: {
        id: true,
        name: true,
        image: true,
        walkerBio: true,
        walkerServiceArea: true,
        walkerRatePerHour: true,
        walkerAvailability: true,
        walkerExperienceYears: true,
        updatedAt: true,
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.warn(
      "Walker directory query failed. Showing an empty public walker list.",
      error
    );
    return [];
  }
}
