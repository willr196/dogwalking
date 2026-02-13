import Link from "next/link";
import { type DogBreed } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DOG_BREEDS } from "@/lib/dog-breeds";
import { AdminDogBreedsManager } from "./AdminDogBreedsManager";

export const dynamic = "force-dynamic";

export default async function AdminDogBreedsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/sign-in");
  }

  let breeds: DogBreed[] = [];
  let dbReady = true;

  try {
    breeds = await prisma.dogBreed.findMany({
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });
  } catch {
    dbReady = false;
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] px-5 pt-[100px] pb-[70px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--deep-green)] transition-colors"
          >
            ← Back to dashboard
          </Link>
          <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.4rem)] mt-2">
            Dog Breed Manager
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Drag-and-drop ordering, CSV tools, uploads, and full CRUD.
          </p>
        </div>

        {!dbReady ? (
          <div className="bg-[var(--warm-white)] border border-[var(--orange)]/30 rounded-2xl p-5 text-sm text-[var(--muted)]">
            Dog breed table is not available yet. Run your Prisma migration, then
            refresh this page.
          </div>
        ) : (
          <AdminDogBreedsManager
            initialBreeds={breeds}
            defaultBreedCount={DOG_BREEDS.length}
          />
        )}
      </div>
    </div>
  );
}
