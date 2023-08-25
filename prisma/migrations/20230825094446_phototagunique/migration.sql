/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PhotoTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PhotoTag_name_key" ON "PhotoTag"("name");
