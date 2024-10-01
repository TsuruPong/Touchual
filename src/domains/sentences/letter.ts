import { IDetail } from "@/feature/interfaces/detail";
import { IDomain } from "@/feature/interfaces/domain";
import { AbstractFactory } from "@/feature/interfaces/factory";
import { IValidator } from "@/feature/interfaces/validator";
import { IEntityBuilder } from "@/feature/interfaces/entityBuilder";
import { ILetterMoraTreeNode, LetterMoraTreeNodeFactory, LetterMoraTreeNodeGenerateDetail } from "./letterTreeNode";
import { IWord, Word } from "./word";

export interface ILetter extends IDomain<ILetter> {
    getWord(): IWord;
    append(next: ILetter): void;
    getNext(): ILetter | null;
    getPrev(): ILetter | null;
    getMoraTreeNodes(): ILetterMoraTreeNode[];
}

export class Letter implements ILetter {
    private word: IWord;
    private moraTreeNodes: ILetterMoraTreeNode[];
    private next: ILetter | null = null;
    private prev: ILetter | null = null;
    constructor()
    constructor(word?: IWord)
    constructor(word?: IWord, moras?: ILetterMoraTreeNode[])
    constructor(word?: IWord, moras?: ILetterMoraTreeNode[], next?: ILetter)
    constructor(word?: IWord, moras?: ILetterMoraTreeNode[], next?: ILetter, prev?: ILetter)
    constructor(word?: IWord, moras?: ILetterMoraTreeNode[], next?: ILetter, prev?: ILetter) {
        this.word = word ?? new Word("root");
        this.moraTreeNodes = moras ?? [];
        this.next = next ?? null;
        this.prev = prev ?? null;
    }

    getWord(): IWord {
        return this.word;
    }

    append(next: ILetter): void {
        if(!this.next) {
            this.next = next;
            return;
        };
        this.next.append(next);
    }

    getNext(): ILetter | null {
        return this.next;
    }

    getPrev(): ILetter | null {
        return this.prev;
    }

    getMoraTreeNodes(): ILetterMoraTreeNode[] {
        return this.moraTreeNodes;
    }
}

export interface ILetterGenerateDetail extends IDetail<ILetter> {
    getWord(): IWord;
    getMoras(): string[];
}

export class LetterGenerateDetail implements ILetterGenerateDetail {
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

class LetterValidator implements IValidator<ILetterGenerateDetail[], ILetter> {
    validate(detail: ILetterGenerateDetail[]): boolean {
        if (!detail) throw new Error(``);
        return true;
    }
}

class LetterBuilder implements IEntityBuilder<ILetterGenerateDetail[], ILetter> {
    build(detail: ILetterGenerateDetail[]): ILetter {
        const letter = new Letter();
        let prev = letter;
        const moraFactory = new LetterMoraTreeNodeFactory();
        for (const d of detail) {
            const moraTreeNodes = moraFactory.build(new LetterMoraTreeNodeGenerateDetail(d.getMoras()))
            const current = new Letter(d.getWord(), moraTreeNodes, undefined, prev);
            letter.append(current);
            prev = current;
        }
        return letter;
    }
}

export class LetterFactory extends AbstractFactory<ILetterGenerateDetail[], ILetter> {
    constructor() {
        super(new LetterValidator(), new LetterBuilder())
    }
}
