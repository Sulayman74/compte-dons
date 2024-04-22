/*
  Warnings:

  - The values [Manage,Create,Read,Update,Delete] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('MANAGE', 'CREATE', 'READ', 'UPDATE', 'DELETE');
ALTER TABLE "User" ALTER COLUMN "action" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "Action_old";
ALTER TABLE "User" ALTER COLUMN "action" SET DEFAULT 'READ';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAuthenticated" BOOLEAN,
ALTER COLUMN "action" SET DEFAULT 'READ';
