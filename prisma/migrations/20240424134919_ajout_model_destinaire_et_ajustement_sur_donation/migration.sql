/*
  Warnings:

  - Added the required column `destinataireId` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "destinataireId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Destinataire" (
    "city" TEXT,
    "country" TEXT,
    "email" TEXT,
    "firstname" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "isFamily" BOOLEAN NOT NULL,
    "lastname" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "street" TEXT,
    "zipcode" TEXT,

    CONSTRAINT "Destinataire_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_destinataireId_fkey" FOREIGN KEY ("destinataireId") REFERENCES "Destinataire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
