-- CreateTable
CREATE TABLE "Sentences" (
    "text" TEXT NOT NULL,
    "ruby" TEXT NOT NULL,

    CONSTRAINT "Sentences_pkey" PRIMARY KEY ("text","ruby")
);
