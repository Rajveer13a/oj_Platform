/*
  Warnings:

  - Changed the type of `language` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('javascript', 'python');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- CreateTable
CREATE TABLE "Boilerplate" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "starterCode" TEXT NOT NULL,
    "driverCode" TEXT NOT NULL,

    CONSTRAINT "Boilerplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boilerplate_problemId_language_key" ON "Boilerplate"("problemId", "language");

-- AddForeignKey
ALTER TABLE "Boilerplate" ADD CONSTRAINT "Boilerplate_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
