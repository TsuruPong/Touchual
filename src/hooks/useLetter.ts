"use client"

import { ILetter, LetterFactory, LetterGenerateDetail } from "@/domains/sentences/letter";
import { MoraFactory, MoraGenerateDetail } from "@/domains/sentences/mora";
import { WordFactory, WordGenerateDetail } from "@/domains/sentences/word";

export const useLetter = (sentence: string): ILetter => {
    const words = new WordFactory().build(new WordGenerateDetail(sentence));
    const moras = new MoraFactory().build(new MoraGenerateDetail(words));
    const letter = new LetterFactory().build(moras.map(m => new LetterGenerateDetail(m.getWord(), m.getMoras())));
    return letter;
}
