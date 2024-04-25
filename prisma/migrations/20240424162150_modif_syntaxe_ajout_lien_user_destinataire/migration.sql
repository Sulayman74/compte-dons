-- AlterTable
ALTER TABLE "Destinataire" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Destinataire" ADD CONSTRAINT "Destinataire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
