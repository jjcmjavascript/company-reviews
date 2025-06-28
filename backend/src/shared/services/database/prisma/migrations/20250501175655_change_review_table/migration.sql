/*
  Warnings:

  - You are about to drop the `ReviewDislike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- DropForeignKey
ALTER TABLE "ReviewDislike" DROP CONSTRAINT "ReviewDislike_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewDislike" DROP CONSTRAINT "ReviewDislike_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewLike" DROP CONSTRAINT "ReviewLike_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewLike" DROP CONSTRAINT "ReviewLike_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ReviewDislike";

-- DropTable
DROP TABLE "ReviewLike";

-- CreateTable
CREATE TABLE "ReviewReaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,
    "type" "ReactionType" NOT NULL DEFAULT 'LIKE',

    CONSTRAINT "ReviewReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewReaction_reviewId_type_idx" ON "ReviewReaction"("reviewId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewReaction_userId_reviewId_key" ON "ReviewReaction"("userId", "reviewId");

-- AddForeignKey
ALTER TABLE "ReviewReaction" ADD CONSTRAINT "ReviewReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewReaction" ADD CONSTRAINT "ReviewReaction_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
