import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const CSV_HEADERS = [
  "slug",
  "name",
  "size",
  "category",
  "temperament",
  "exercise",
  "coatCare",
  "idealFor",
  "note",
  "imageUrl",
  "isActive",
  "displayOrder",
] as const;

function normalizeSpreadsheetValue(value: string) {
  if (/^[=+\-@]/.test(value)) {
    return `'${value}`;
  }
  return value;
}

function escapeCsvValue(value: string) {
  const safeValue = normalizeSpreadsheetValue(value);
  const escaped = safeValue.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const breeds = await prisma.dogBreed.findMany({
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    const rows = breeds.map((breed) => [
      breed.slug,
      breed.name,
      breed.size,
      breed.category,
      breed.temperament,
      breed.exercise,
      breed.coatCare,
      breed.idealFor,
      breed.note,
      breed.imageUrl || "",
      String(breed.isActive),
      String(breed.displayOrder),
    ]);

    const csv = [
      CSV_HEADERS.join(","),
      ...rows.map((row) => row.map((cell) => escapeCsvValue(cell)).join(",")),
    ].join("\n");

    const today = new Date().toISOString().slice(0, 10);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=dog-breeds-${today}.csv`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to export dog breeds CSV", error);
    return NextResponse.json(
      { error: "Failed to export breeds" },
      { status: 500 },
    );
  }
}
