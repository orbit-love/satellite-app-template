/*
  Warnings:

  - You are about to drop the column `linkedin_url` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `twitter_url` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "linkedin_url",
DROP COLUMN "twitter_url";

-- CreateTable
CREATE TABLE "Identity" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "profile_url" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
