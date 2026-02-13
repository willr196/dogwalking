import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DOG_BREEDS } from "@/lib/dog-breeds";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await prisma.dogBreed.createMany({
      data: DOG_BREEDS.map((breed, index) => ({
        slug: breed.slug,
        name: breed.name,
        size: breed.size,
        category: breed.category,
        temperament: breed.temperament,
        exercise: breed.exercise,
        coatCare: breed.coatCare,
        idealFor: breed.idealFor,
        note: breed.note,
        imageUrl: breed.imageUrl,
        isActive: true,
        displayOrder: index,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ ok: true, inserted: result.count });
  } catch (error) {
    console.error("Failed to import default dog breeds", error);
    return NextResponse.json(
      { error: "Failed to import default breeds" },
      { status: 500 },
    );
  }
}
