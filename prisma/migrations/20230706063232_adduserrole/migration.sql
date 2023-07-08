/*
  Warnings:

  - Added the required column `bilibiliAvatar` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubAvatar` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitterAvatar` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weiboAvatar` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "bilibiliAvatar" TEXT NOT NULL,
ADD COLUMN     "githubAvatar" TEXT NOT NULL,
ADD COLUMN     "twitterAvatar" TEXT NOT NULL,
ADD COLUMN     "weiboAvatar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
