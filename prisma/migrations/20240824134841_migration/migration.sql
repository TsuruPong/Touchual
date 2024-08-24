/*
  Warnings:

  - You are about to alter the column `difficulty` on the `SentenceIndicators` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,2)`.
  - A unique constraint covering the columns `[text,ruby]` on the table `SentenceIndicators` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text,ruby]` on the table `Sentences` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SentenceIndicators_ruby_key";

-- DropIndex
DROP INDEX "SentenceIndicators_text_key";

-- DropIndex
DROP INDEX "Sentences_ruby_key";

-- DropIndex
DROP INDEX "Sentences_text_key";

-- AlterTable
ALTER TABLE "SentenceIndicators" ALTER COLUMN "difficulty" SET DATA TYPE DECIMAL(5,2);

-- CreateIndex
CREATE INDEX "SentenceIndicators_text_level_difficulty_idx" ON "SentenceIndicators"("text", "level", "difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "SentenceIndicators_text_ruby_key" ON "SentenceIndicators"("text", "ruby");

-- CreateIndex
CREATE INDEX "Sentences_text_idx" ON "Sentences"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Sentences_text_ruby_key" ON "Sentences"("text", "ruby");
