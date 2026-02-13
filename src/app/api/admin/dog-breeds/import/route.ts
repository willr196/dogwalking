import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BREED_CATEGORIES, DOG_SIZES } from "@/lib/dog-breeds";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const REQUIRED_HEADERS = [
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

const csvRowSchema = z.object({
  slug: z.string().min(1).max(120),
  name: z.string().min(2).max(120),
  size: z.enum(DOG_SIZES),
  category: z.enum(BREED_CATEGORIES),
  temperament: z.string().min(3).max(220),
  exercise: z.string().min(5).max(240),
  coatCare: z.string().min(5).max(240),
  idealFor: z.string().min(5).max(240),
  note: z.string().min(5).max(260),
  imageUrl: z.string().url().max(600).optional().or(z.literal("")),
  isActive: z.boolean(),
  displayOrder: z.number().int().min(0).max(9999),
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function parseBoolean(raw: string) {
  const normalized = raw.trim().toLowerCase();
  if (["true", "1", "yes", "y"].includes(normalized)) return true;
  if (["false", "0", "no", "n"].includes(normalized)) return false;
  return null;
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      cell = "";
      if (row.some((entry) => entry.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some((entry) => entry.length > 0)) {
    rows.push(row);
  }

  return rows;
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let file: File | null = null;

  try {
    const formData = await req.formData();
    const value = formData.get("file");
    if (value instanceof File) {
      file = value;
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid multipart form data" },
      { status: 400 },
    );
  }

  if (!file) {
    return NextResponse.json({ error: "CSV file is required" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "CSV file must be 5MB or smaller" },
      { status: 400 },
    );
  }

  try {
    const rawText = await file.text();
    const text = rawText.replace(/^\uFEFF/, "");
    const rows = parseCsv(text);

    if (rows.length < 2) {
      return NextResponse.json(
        { error: "CSV must include a header and at least one row" },
        { status: 400 },
      );
    }

    const headers = rows[0].map((entry) => entry.trim());
    const missingHeaders = REQUIRED_HEADERS.filter(
      (header) => !headers.includes(header),
    );

    if (missingHeaders.length > 0) {
      return NextResponse.json(
        {
          error: "CSV is missing required headers",
          missingHeaders,
        },
        { status: 400 },
      );
    }

    const headerIndex = new Map(headers.map((header, idx) => [header, idx]));

    const existingSlugs = new Set(
      (
        await prisma.dogBreed.findMany({
          select: { slug: true },
        })
      ).map((breed) => breed.slug),
    );

    let created = 0;
    let updated = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (let i = 1; i < rows.length; i += 1) {
      const row = rows[i];
      if (!row || row.every((entry) => entry.trim() === "")) {
        skipped += 1;
        continue;
      }

      const get = (key: (typeof REQUIRED_HEADERS)[number]) =>
        row[headerIndex.get(key) ?? -1]?.trim() ?? "";

      const parsedBool = parseBoolean(get("isActive"));
      if (parsedBool === null) {
        errors.push(`Row ${i + 1}: isActive must be true/false`);
        continue;
      }

      const orderRaw = Number.parseInt(get("displayOrder"), 10);
      const displayOrder = Number.isFinite(orderRaw) && orderRaw >= 0 ? orderRaw : i - 1;

      const parsedRow = csvRowSchema.safeParse({
        slug: slugify(get("slug") || get("name")),
        name: get("name"),
        size: get("size"),
        category: get("category"),
        temperament: get("temperament"),
        exercise: get("exercise"),
        coatCare: get("coatCare"),
        idealFor: get("idealFor"),
        note: get("note"),
        imageUrl: get("imageUrl"),
        isActive: parsedBool,
        displayOrder,
      });

      if (!parsedRow.success) {
        errors.push(`Row ${i + 1}: invalid data`);
        continue;
      }

      const data = parsedRow.data;

      try {
        await prisma.dogBreed.upsert({
          where: { slug: data.slug },
          update: {
            name: data.name,
            size: data.size,
            category: data.category,
            temperament: data.temperament,
            exercise: data.exercise,
            coatCare: data.coatCare,
            idealFor: data.idealFor,
            note: data.note,
            imageUrl: data.imageUrl || null,
            isActive: data.isActive,
            displayOrder: data.displayOrder,
          },
          create: {
            slug: data.slug,
            name: data.name,
            size: data.size,
            category: data.category,
            temperament: data.temperament,
            exercise: data.exercise,
            coatCare: data.coatCare,
            idealFor: data.idealFor,
            note: data.note,
            imageUrl: data.imageUrl || null,
            isActive: data.isActive,
            displayOrder: data.displayOrder,
          },
        });

        if (existingSlugs.has(data.slug)) {
          updated += 1;
        } else {
          existingSlugs.add(data.slug);
          created += 1;
        }
      } catch (error) {
        console.error("Failed to upsert row", { row: i + 1, error });
        errors.push(`Row ${i + 1}: failed to save`);
      }
    }

    return NextResponse.json({
      ok: true,
      created,
      updated,
      skipped,
      errors,
    });
  } catch (error) {
    console.error("Failed to import dog breeds CSV", error);
    return NextResponse.json(
      { error: "Failed to import CSV" },
      { status: 500 },
    );
  }
}
