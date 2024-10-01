import { IDetail } from "@/feature/interfaces/detail";
import { IDomain } from "@/feature/interfaces/domain";
import { AbstractFactory } from "@/feature/interfaces/factory";
import { IValidator } from "@/feature/interfaces/validator";
import { IEntityBuilder } from "@/feature/interfaces/entityBuilder";

export interface ILetterMoraTreeNode extends IDomain<ILetterMoraTreeNode> {
    getValue(): string;
    getNext(): ILetterMoraTreeNode[];
    add(v: string): void;
    find(v: string): ILetterMoraTreeNode | null;
    isExists(v: string): boolean;
}

export class LetterMoraTreeNode implements ILetterMoraTreeNode {
    private value: string;
    private next: ILetterMoraTreeNode[];
    constructor(value: string){
        if (!value) throw new Error(``);
        this.value = value;
        this.next =  [];
    }

    getValue(): string {
        return this.value;
    }

    getNext(): ILetterMoraTreeNode[] {
        return this.next;
    }

    add(v: string): void {
        if (!this.isExists(v)) {
            this.next.push(new LetterMoraTreeNode(v));
            return;
        }
        this.next.map(n => n.add(v));
    }

    find(v: string): ILetterMoraTreeNode | null {
        return this.next.find(n => n.getValue() === v) || null;
    }

    isExists(v: string): boolean {
        return this.next.filter(n => n.getValue() == v).length > 0;
    }
}

export interface ILetterMoraTreeNodeGenerateDetail extends IDetail<ILetterMoraTreeNode> {
    getMoras(): string[];
}

export class LetterMoraTreeNodeGenerateDetail implements ILetterMoraTreeNodeGenerateDetail {
    private moras: string[];
    constructor(moras: string[]) {
        this.moras = moras;
    }

    getMoras(): string[] {
        return this.moras;
    }
}

class LetterMoraTreeNodeValidator implements IValidator<ILetterMoraTreeNodeGenerateDetail, ILetterMoraTreeNode> {
    validate(detail: ILetterMoraTreeNodeGenerateDetail): boolean {
        if (!detail) throw new Error(``);
        return true;
    }
}

class LetterMoraTreeNodeBuilder implements IEntityBuilder<ILetterMoraTreeNodeGenerateDetail, ILetterMoraTreeNode[]> {
    build(detail: ILetterMoraTreeNodeGenerateDetail): ILetterMoraTreeNode[] {
        const moraTreeNodes: ILetterMoraTreeNode[] = [];
        for (const mora of detail.getMoras()) {
            const splited = [...mora];
            let prev: ILetterMoraTreeNode | null = null;
            for (const s of splited) {
                if (!prev) {
                    const foundRoot = moraTreeNodes.find(n => n.getValue() == s);
                    if (foundRoot) {
                        prev = foundRoot;
                    } else {
                        const root = new LetterMoraTreeNode(s); 
                        moraTreeNodes.push(root)
                        prev = root;
                    }
                } else {
                    const foundCurrent: ILetterMoraTreeNode | null = prev.find(s);
                    if (foundCurrent) {
                        prev = foundCurrent;
                    } else {
                        prev.add(s);
                        prev = prev.find(s);
                    }
                }
            }
        }
        return moraTreeNodes;
    }
}

export class LetterMoraTreeNodeFactory extends AbstractFactory<ILetterMoraTreeNodeGenerateDetail, ILetterMoraTreeNode[]> {
    constructor() {
        super(new LetterMoraTreeNodeValidator(), new LetterMoraTreeNodeBuilder())
    }
}