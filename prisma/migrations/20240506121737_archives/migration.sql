-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_archiveId_fkey";

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
