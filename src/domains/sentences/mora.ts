import { Hiragana } from "@/const/hiragana/hiragana";
import { HiraganaDictionary } from "@/const/hiragana/dictionary";
import { KanaSymbol } from "@/type/hiragana/kanaSymbol";
import { IDetail } from "@/feature/interfaces/detail";
import { IDomain } from "@/feature/interfaces/domain";
import { AbstractFactory } from "@/feature/interfaces/factory";
import { IValidator } from "@/feature/interfaces/validator";
import { IEntityBuilder } from "@/feature/interfaces/entityBuilder";
import { IWord } from "./word";

export interface IMora extends IDomain<IMora> {
    getWord(): IWord;
    getMoras(): string[];
}

export class Mora implements IMora {
    private word: IWord;
    private moras: string[];
    constructor(word: IWord, moras: string[]) {
        if (!word) throw new Error(`illegal argument word : ${word}`);
        if (!moras) throw new Error(`illegal argument moras : ${moras}`);
        this.word = word;
        this.moras = moras;
    }

    getWord(): IWord {
        return this.word;
    }

    getMoras(): string[] {
        return this.moras;
    }
}

export interface IMoraGenerateDetail extends IDetail<IMora> {
    getWords(): IWord[];
}

export class MoraGenerateDetail implements IMoraGenerateDetail {
    private words: IWord[];
    constructor(words: IWord[]) {
        if (!words) throw new Error(`illegal argument words : ${words}`);
        this.words = words;
    }

    getWords(): IWord[] {
        return this.words;
    }
}

class MoraValidator implements IValidator<IMoraGenerateDetail, IMora> {
    validate(detail: IMoraGenerateDetail): boolean {
        if (!detail) throw new Error(``);
        return true;
    }
}

class MoraBuilder implements IEntityBuilder<IMoraGenerateDetail, IMora[]> {
    private nagyouChars: string[] = [
        Hiragana.NA,
        Hiragana.NI,
        Hiragana.NU,
        Hiragana.NE,
        Hiragana.NO,
    ];

    build(detail: IMoraGenerateDetail): IMora[] {
        const mora: Mora[] = [];
        for(let i = 0; i < detail.getWords().length; i++) {
            const currentWord = detail.getWords()[i].getWord();
            const current = HiraganaDictionary.get(currentWord);
            if (!current) throw new Error(`${currentWord} is undefined of dictionary`);
            
            let moras: string[] = this.generateMora(current);

            // カレントが拗音
            if (current.origin && current.kogaki) {
                let youonOrigin = this.generateMora(current.origin);
                let youonKogaki = this.generateMora(current.kogaki);
                for (const origin of youonOrigin) {
                    for (const kogaki of youonKogaki) {
                        moras.push(`${origin}${kogaki}`);
                    }
                }
            }
  
            // カレントが「ん」かつ次の文字が「な行」以外
            if (Hiragana.N == currentWord) {
                if (i + 1 < detail.getWords().length) {
                    const nextWord = detail.getWords()[i + 1].getWord();
                    if (!this.nagyouChars.includes(nextWord)) {
                        moras.push(current.boin);
                    }
                }
            }
        
            // カレントが「っ」
            if (Hiragana.XTU == currentWord) {
                if (i + 1 < detail.getWords().length) {
                    const next = HiraganaDictionary.get(detail.getWords()[i + 1].getWord());
                    if (next) {
                        const nextShiins = next.origin ? next.origin.shiins?.map(v => v.slice(0, 1)) : next.shiins;
                        moras = [...moras, ...nextShiins];
                    }
                }
            }

            mora.push(new Mora(detail.getWords()[i], moras));
        }

        return mora;
    }

    private generateMora(current: KanaSymbol): string[] {
        if (current.shiins.length == 0)  return [current.boin];
        return current.shiins.map(shiin => `${shiin}${current.boin}`);
    }
}

export class MoraFactory extends AbstractFactory<IMoraGenerateDetail, IMora[]> {
    constructor() {
        super(new MoraValidator(), new MoraBuilder())
    }
}