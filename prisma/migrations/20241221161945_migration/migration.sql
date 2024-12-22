/*
  Warnings:

  - The primary key for the `Sentences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Sentences` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SentenceIndicators_text_level_difficulty_idx";

-- DropIndex
DROP INDEX "SentenceIndicators_text_ruby_key";

-- DropIndex
DROP INDEX "Sentences_text_idx";

-- AlterTable
ALTER TABLE "SentenceIndicators" DROP CONSTRAINT "SentenceIndicators_text_ruby_fkey";
ALTER TABLE "Sentences" DROP CONSTRAINT "Sentences_pkey" CASCADE,
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Sentences_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "SentenceIndicators_level_difficulty_idx" ON "SentenceIndicators"("level", "difficulty");

-- CreateIndex
CREATE INDEX "Sentences_text_ruby_idx" ON "Sentences"("text", "ruby");
