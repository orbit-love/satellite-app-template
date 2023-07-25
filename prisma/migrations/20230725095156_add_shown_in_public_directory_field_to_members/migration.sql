/*
  Warnings:

  - You are about to drop the column `visible` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "visible",
ADD COLUMN     "shownInDirectory" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "shownInPublicDirectory" BOOLEAN NOT NULL DEFAULT false;
