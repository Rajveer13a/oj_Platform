-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "failedTestCase" INTEGER,
ADD COLUMN     "totalTestCases" INTEGER;
