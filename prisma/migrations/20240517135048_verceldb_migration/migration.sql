/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Destinataire` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Destinataire` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_archiveId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_destinataireId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_userId_fkey";

-- AlterTable
ALTER TABLE "Destinataire" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "isFamily" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "description",
DROP COLUMN "updatedAt",
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "archived" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_destinataireId_fkey" FOREIGN KEY ("destinataireId") REFERENCES "Destinataire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
