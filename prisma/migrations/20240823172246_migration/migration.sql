/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Sentences` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ruby]` on the table `Sentences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "SentenceIndicators" (
    "text" TEXT NOT NULL,
    "ruby" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,

    CONSTRAINT "SentenceIndicators_pkey" PRIMARY KEY ("text","ruby")
);

-- CreateIndex
CREATE UNIQUE INDEX "SentenceIndicators_text_key" ON "SentenceIndicators"("text");

-- CreateIndex
CREATE UNIQUE INDEX "SentenceIndicators_ruby_key" ON "SentenceIndicators"("ruby");

-- CreateIndex
CREATE UNIQUE INDEX "Sentences_text_key" ON "Sentences"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Sentences_ruby_key" ON "Sentences"("ruby");

-- AddForeignKey
ALTER TABLE "SentenceIndicators" ADD CONSTRAINT "SentenceIndicators_text_ruby_fkey" FOREIGN KEY ("text", "ruby") REFERENCES "Sentences"("text", "ruby") ON DELETE RESTRICT ON UPDATE CASCADE;
