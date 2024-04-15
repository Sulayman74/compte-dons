/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('MANAGE', 'CREATE', 'READ', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin";
