-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_destinataireId_fkey";

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_destinataireId_fkey" FOREIGN KEY ("destinataireId") REFERENCES "Destinataire"("id") ON DELETE CASCADE ON UPDATE CASCADE;
