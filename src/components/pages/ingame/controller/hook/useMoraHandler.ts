import { Mora, MoraNode, tokenize } from "manimani"
import { MoraNodeWithStatus, MoraWithStatus } from "@/types/extends/manimani";
import { AutoCompleate } from "../../presentation/autocompleate/type";
import { LetterKind } from "../../presentation/letter/type";

export const useMoraHandler = () => {
    const tokenizer = useMoraTokenizer();
    const converter = useMoraConverter();
    const updator = useMoraUpdator();
    return {
        tokenizer,
        converter,
        updator
    };
};

const useMoraTokenizer = () => {
    const toTokens = async(sentence: { text: string, ruby: string }): Promise<Mora[]> => {
        return await new Promise(resolve => {
            tokenize("/dict", sentence.ruby, (moras: Mora[]) => {
                resolve(moras);
            })
        });
    };
    return { toTokens };
}

const useMoraConverter = () => {
    const toMoraWithStatus = (moras: Mora[]): MoraWithStatus[] => {
        return moras.map((mora) => ({
            ...mora,
            status: "unanswered",
            node: toMoraNodeWithStatus(mora.node)
        }));
    };

    const toMoraNodeWithStatus = (nodes: MoraNode[]): MoraNodeWithStatus[] => {
        return nodes.map((node) => ({
            ...node,
            status: "unanswered",
            children: toMoraNodeWithStatus(node.children)
        }));
    };

    const toAutoCompleate = (moras: MoraWithStatus[]): AutoCompleate[] => {
        return moras.flatMap(m => generateAutoCompleateRecursively(m.node));
    }

    const generateAutoCompleateRecursively = (nodes: MoraNodeWithStatus[], result?:AutoCompleate[]): AutoCompleate[] => {
        const r: AutoCompleate[] = result ?? [];
        const first = nodes.find(n => n.status == "correct" || n.status == "incorrect");
        if (first) {
            if (first.status == "correct") {
                r.push({ char: first.val, kind: LetterKind.COLLECT } as AutoCompleate);
            } else {
                r.push({ char: first.val, kind: LetterKind.INCOLLECT } as AutoCompleate);
            }
            return generateAutoCompleateRecursively(first.children, r);
        }
        const shorts = findShortestPath(nodes);
        for (const s of shorts) {
            r.push({ char: s.val, kind: LetterKind.EMPTY } as AutoCompleate);
        }
        return r;
    };

    const findShortestPath = (nodes: MoraNodeWithStatus[]): MoraNodeWithStatus[] => {
        if (nodes.length === 0) return [];
    
        const queue: { node: MoraNodeWithStatus, path: MoraNodeWithStatus[] }[] = 
            nodes.map(node => ({ node, path: [node] }));
    
        while (queue.length > 0) {
            const { node, path } = queue.shift()!;
    
            if (node.children.length === 0) {
                return path;
            }
    
            for (const child of node.children) {
                queue.push({ node: child, path: [...path, child] });
            }
        }
        return [];
    };
    
    return { toMoraWithStatus, toAutoCompleate };
}

const useMoraUpdator = () => {
    const updateCorrect = (moras: MoraWithStatus[], input: string): MoraWithStatus[] => {
        const c = [...moras];
        const m = c.find(m => m.status != "correct");
        if (!m?.node) return c;
        const n = findTargetMoraNodeRecursively(m.node);
        n.map(nn => {
            if (nn.val == input) {
                nn.status = "correct";
                if (nn.children.length == 0) {
                    m.status = "correct";
                }
            } else {
                nn.status = "unanswered";
            }
        })
        return c;
    }

    const updateIncorrect = (moras: MoraWithStatus[]): MoraWithStatus[] => {
        const c = [...moras];
        const m = c.find(m => m.status != "correct");
        if (!m?.node) return c;
        const n = findTargetMoraNodeRecursively(m.node);
        n.map(nn => nn.status = "incorrect");
        return c;
    }

    const findTargetMoraNodeRecursively = (nodes: MoraNodeWithStatus[]): MoraNodeWithStatus[] => {
        const n = nodes.find(n => n.status == "correct");
        if (n) {
            return findTargetMoraNodeRecursively(n.children);
        } else {
            return nodes;
        }
    }

    return {
        updateCorrect,
        updateIncorrect
    };
}