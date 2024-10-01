import { Hiragana } from '@/const/hiragana/hiragana';
import { ILetter } from '@/domains/sentences/letter'
import { ILetterMoraTreeNode } from '@/domains/sentences/letterTreeNode';

export const useTypingValidator= () => {
    const validateTyping = (letter: ILetter, collects: string[], inputKey: string): boolean => {
        if (collects.length == 0) {
            return letter.getMoraTreeNodes().map((m) => m.getValue()).includes(inputKey);
        }
        let l: ILetter | null = letter;
        let n: number = 0;
        while (l) {
            let treeNodes: ILetterMoraTreeNode[] = l.getMoraTreeNodes();
            while(treeNodes) {
                if (collects.length <= n) {
                    // カレントが「っ」
                    if (l.getWord().getWord() == Hiragana.XTU) {
                        if (treeNodes.some((t) => t.getValue() == collects[n - 1])) {
                            return collects[n-1] == inputKey
                        }
                    }
                    // カレントが「ん」
                    if (l.getWord().getWord() == Hiragana.N) {
                        const nextTreeNode = l.getNext()?.getMoraTreeNodes();
                        if (!nextTreeNode) {
                            return treeNodes.map((n) => n.getValue()).includes(inputKey)
                        } else {
                            return treeNodes.map((n) => n.getValue()).includes(inputKey) || nextTreeNode.map((n) => n.getValue()).includes(inputKey);
                        }
                    }
                    return treeNodes.map((n) => n.getValue()).includes(inputKey);
                }
                const current = treeNodes.find((m) => m.getValue() == collects[n]);
                if (!current) break;
                n++;
                treeNodes = current.getNext();
                if (treeNodes.length == 0) break;
            }
            const next: ILetter | null = l.getNext();
            if (!next) break;
            l = next;
        }

        return false;
    }
    return { validateTyping };
}
