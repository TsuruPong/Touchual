-- AlterTable
CREATE SEQUENCE sentences_id_seq;
ALTER TABLE "Sentences" ALTER COLUMN "id" SET DEFAULT nextval('sentences_id_seq');
ALTER SEQUENCE sentences_id_seq OWNED BY "Sentences"."id";

-- AddForeignKey
ALTER TABLE "SentenceIndicators" ADD CONSTRAINT "SentenceIndicators_text_ruby_fkey" FOREIGN KEY ("text", "ruby") REFERENCES "Sentences"("text", "ruby") ON DELETE RESTRICT ON UPDATE CASCADE;
