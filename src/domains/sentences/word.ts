import { Hiragana } from "@/components/containers/const/hiragana/hiragana";
import { IDetail } from "@/components/containers/feature/interfaces/detail";
import { IDomain } from "@/components/containers/feature/interfaces/domain";
import { AbstractFactory } from "@/components/containers/feature/interfaces/factory";
import { IValidator } from "@/components/containers/feature/interfaces/validator";
import { IEntityBuilder } from "@/components/containers/feature/interfaces/entityBuilder";

export interface IWord extends IDomain<IWord> {
    getWord(): string;
}

export class Word implements IWord {
    private word: string;
    constructor(word: string) {
        if(!word) throw new Error(`illegal argument word : ${word}`);
        this.word = word;
    }
    
    getWord(): string {
        return this.word;
    }
}

export interface IWordGenerateDetail extends IDetail<IWord> {
    getSentence(): string;
}

export class WordGenerateDetail implements IWordGenerateDetail {
    private sentence: string;
    constructor(sentence: string) {
        if(!sentence) throw new Error(`illegal argument sentence : ${sentence}`);
        this.sentence = sentence;
    }

    getSentence(): string {
        return this.sentence;
    }
}

class WordValidator implements IValidator<IWordGenerateDetail, IWord> {
    validate(detail: IWordGenerateDetail): boolean {
        if (!detail) throw new Error(``);
        return true;
    }
}

class WordBuilder implements IEntityBuilder<IWordGenerateDetail, IWord[]> {
    private youonChars: string[] = [
        Hiragana.XA,
        Hiragana.XI,
        Hiragana.XU,
        Hiragana.XE,
        Hiragana.XO,
        Hiragana.XYA,
        Hiragana.XYU,
        Hiragana.XYO,
    ];

    build(detail: IWordGenerateDetail): IWord[] {
        const words: Word[] = [];
        const splited = [...detail.getSentence()];
        for (let i = 0; i < splited.length; i++) {
            const current = splited[i];
            
            if (this.youonChars.includes(current)) continue;

            if (i + 1 < splited.length) {
                const next = splited[i + 1];
                if (this.youonChars.includes(next)) {
                    words.push(new Word(`${current}${next}`));
                    continue;
                }
            }
            words.push(new Word(current));
        }
        return words;
    }
}

export class WordFactory extends AbstractFactory<IWordGenerateDetail, IWord[]> {
    constructor() {
        super(new WordValidator(), new WordBuilder())
    }
}