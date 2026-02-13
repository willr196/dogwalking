import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const reorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = reorderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const ids = parsed.data.ids;
  const idSet = new Set(ids);
  if (idSet.size !== ids.length) {
    return NextResponse.json(
      { error: "Duplicate IDs in payload" },
      { status: 400 },
    );
  }

  try {
    const allBreeds = await prisma.dogBreed.findMany({
      select: { id: true },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    if (allBreeds.length !== ids.length) {
      return NextResponse.json(
        { error: "Payload must include every breed id" },
        { status: 400 },
      );
    }

    const dbIdSet = new Set(allBreeds.map((breed) => breed.id));
    if (ids.some((id) => !dbIdSet.has(id))) {
      return NextResponse.json(
        { error: "Payload includes unknown breed id" },
        { status: 400 },
      );
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.dogBreed.update({
          where: { id },
          data: { displayOrder: index },
        }),
      ),
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to reorder dog breeds", error);
    return NextResponse.json(
      { error: "Failed to reorder breeds" },
      { status: 500 },
    );
  }
}
