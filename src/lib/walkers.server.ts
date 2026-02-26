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

let loggedMissingWalkerProfileColumns = false;

function getPrismaErrorCode(error: unknown): string | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  ) {
    return (error as { code: string }).code;
  }

  return null;
}

async function getApprovedWalkersWithoutProfileColumns(): Promise<PublicWalkerProfile[]> {
  const walkers = await prisma.user.findMany({
    where: {
      role: "WALKER",
      walkerApprovalStatus: "APPROVED",
    },
    select: {
      id: true,
      name: true,
      image: true,
      updatedAt: true,
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return walkers.map((walker) => ({
    ...walker,
    walkerBio: null,
    walkerServiceArea: null,
    walkerRatePerHour: null,
    walkerAvailability: null,
    walkerExperienceYears: null,
  }));
}

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
    if (getPrismaErrorCode(error) === "P2022") {
      try {
        const walkers = await getApprovedWalkersWithoutProfileColumns();

        if (!loggedMissingWalkerProfileColumns) {
          console.warn(
            "Walker profile columns are missing in the current database. Showing approved walkers without profile details."
          );
          loggedMissingWalkerProfileColumns = true;
        }

        return walkers;
      } catch (fallbackError) {
        console.warn(
          "Walker directory fallback query failed. Showing an empty public walker list.",
          fallbackError
        );
        return [];
      }
    }

    console.warn(
      "Walker directory query failed. Showing an empty public walker list.",
      error
    );
    return [];
  }
}
