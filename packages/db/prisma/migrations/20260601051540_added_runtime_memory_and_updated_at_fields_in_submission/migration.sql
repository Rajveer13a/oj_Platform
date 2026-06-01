/*
  Warnings:

  - Added the required column `updatedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "memory" INTEGER,
ADD COLUMN     "runtime" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
