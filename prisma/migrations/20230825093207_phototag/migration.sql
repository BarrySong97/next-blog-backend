-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "content" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "PhotoTag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PhotoTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PhotoTagToPhoto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoTagToPhoto_AB_unique" ON "_PhotoTagToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoTagToPhoto_B_index" ON "_PhotoTagToPhoto"("B");

-- AddForeignKey
ALTER TABLE "_PhotoTagToPhoto" ADD CONSTRAINT "_PhotoTagToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoTagToPhoto" ADD CONSTRAINT "_PhotoTagToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "PhotoTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
