-- CreateTable
CREATE TABLE "DogBreed" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "temperament" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "coatCare" TEXT NOT NULL,
    "idealFor" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DogBreed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DogBreed_slug_key" ON "DogBreed"("slug");

-- CreateIndex
CREATE INDEX "DogBreed_isActive_category_name_idx" ON "DogBreed"("isActive", "category", "name");
