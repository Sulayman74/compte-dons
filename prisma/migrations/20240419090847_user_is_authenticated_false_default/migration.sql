/*
  Warnings:

  - Made the column `isAuthenticated` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isAuthenticated" SET NOT NULL,
ALTER COLUMN "isAuthenticated" SET DEFAULT false;
