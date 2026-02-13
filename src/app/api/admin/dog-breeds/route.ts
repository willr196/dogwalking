import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BREED_CATEGORIES, DOG_SIZES } from "@/lib/dog-breeds";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const baseBreedSchema = z.object({
  slug: z.string().min(2).max(120).optional().or(z.literal("")),
  name: z.string().min(2).max(120),
  size: z.enum(DOG_SIZES),
  category: z.enum(BREED_CATEGORIES),
  temperament: z.string().min(3).max(220),
  exercise: z.string().min(5).max(240),
  coatCare: z.string().min(5).max(240),
  idealFor: z.string().min(5).max(240),
  note: z.string().min(5).max(260),
  imageUrl: z.string().url().max(600).optional().or(z.literal("")),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().min(0).max(9999).optional(),
});

const updateBreedSchema = baseBreedSchema.extend({
  id: z.string().min(1),
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function resolveSlug(rawSlug: string | undefined, name: string) {
  const slug = slugify(rawSlug || name);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return null;
  }
  return slug;
}

function isPrismaUniqueError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const breeds = await prisma.dogBreed.findMany({
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ breeds });
  } catch (error) {
    console.error("Failed to load dog breeds", error);
    return NextResponse.json(
      { error: "Failed to load breeds" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = baseBreedSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const resolvedSlug = resolveSlug(data.slug, data.name);
  if (!resolvedSlug) {
    return NextResponse.json(
      { error: "Invalid slug after normalization" },
      { status: 400 },
    );
  }

  try {
    const maxOrder = await prisma.dogBreed.aggregate({
      _max: { displayOrder: true },
    });

    const created = await prisma.dogBreed.create({
      data: {
        slug: resolvedSlug,
        name: data.name,
        size: data.size,
        category: data.category,
        temperament: data.temperament,
        exercise: data.exercise,
        coatCare: data.coatCare,
        idealFor: data.idealFor,
        note: data.note,
        imageUrl: data.imageUrl || null,
        isActive: data.isActive ?? true,
        displayOrder:
          data.displayOrder ?? (maxOrder._max.displayOrder ?? -1) + 1,
      },
    });

    return NextResponse.json({ breed: created }, { status: 201 });
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return NextResponse.json(
        { error: "Breed slug already exists" },
        { status: 409 },
      );
    }

    console.error("Failed to create dog breed", error);
    return NextResponse.json(
      { error: "Failed to create breed" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = updateBreedSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const resolvedSlug = resolveSlug(data.slug, data.name);
  if (!resolvedSlug) {
    return NextResponse.json(
      { error: "Invalid slug after normalization" },
      { status: 400 },
    );
  }

  try {
    const updated = await prisma.dogBreed.update({
      where: { id: data.id },
      data: {
        slug: resolvedSlug,
        name: data.name,
        size: data.size,
        category: data.category,
        temperament: data.temperament,
        exercise: data.exercise,
        coatCare: data.coatCare,
        idealFor: data.idealFor,
        note: data.note,
        imageUrl: data.imageUrl || null,
        isActive: data.isActive ?? true,
        ...(typeof data.displayOrder === "number"
          ? { displayOrder: data.displayOrder }
          : {}),
      },
    });

    return NextResponse.json({ breed: updated });
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return NextResponse.json(
        { error: "Breed slug already exists" },
        { status: 409 },
      );
    }

    console.error("Failed to update dog breed", error);
    return NextResponse.json(
      { error: "Failed to update breed" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await prisma.dogBreed.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete dog breed", error);
    return NextResponse.json(
      { error: "Failed to delete breed" },
      { status: 500 },
    );
  }
}
