import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

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
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "Empty file" }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { error: "Image must be 5MB or smaller" },
      { status: 400 },
    );
  }

  const extension = MIME_TO_EXT[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Unsupported image type" },
      { status: 400 },
    );
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "dog-breeds",
    );

    await mkdir(uploadsDir, { recursive: true });

    const filename = `${Date.now()}-${randomUUID()}.${extension}`;
    const target = path.join(uploadsDir, filename);
    await writeFile(target, bytes);

    return NextResponse.json({
      ok: true,
      url: `/uploads/dog-breeds/${filename}`,
    });
  } catch (error) {
    console.error("Failed to upload dog breed image", error);
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 },
    );
  }
}
