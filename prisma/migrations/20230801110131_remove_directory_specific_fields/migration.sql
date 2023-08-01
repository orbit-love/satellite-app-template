/*
  Warnings:

  - You are about to drop the column `bio` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `shownInDirectory` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `shownInPublicDirectory` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the `Identity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Identity" DROP CONSTRAINT "Identity_memberId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "bio",
DROP COLUMN "featured",
DROP COLUMN "shownInDirectory",
DROP COLUMN "shownInPublicDirectory";

-- DropTable
DROP TABLE "Identity";
