import { MoraNodeWithStatus, MoraWithStatus } from "@/types/extends/manimani";
import { AutoCompleate } from "../../presentation/autocompleate/type";
import { LetterKind } from "../../presentation/letter/type";

export const useAutoCompleate = () => {
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

    return { toAutoCompleate }
}