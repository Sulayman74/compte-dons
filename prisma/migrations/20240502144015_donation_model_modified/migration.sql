/*
  Warnings:

  - Made the column `userId` on table `Donation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_userId_fkey";

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
