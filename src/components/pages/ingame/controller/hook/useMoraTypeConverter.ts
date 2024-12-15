import { Mora, MoraNode } from "manimani";
import { MoraNodeWithStatus, MoraWithStatus } from "../type/extends/mora";
import { AutoCompleate } from "../../presentation/autocompleate/type";
import { LetterKind } from "../../presentation/letter/type";

export const useMoraTypeConverter = () => {
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
        return moras.flatMap(m => getCorrectNodes(m.node));
    }

    const getCorrectNodes = (nodes: MoraNodeWithStatus[], result?:AutoCompleate[]): AutoCompleate[] => {
        const r: AutoCompleate[] = result ?? [];
        const first = nodes.find(n => n.status == "correct" || n.status == "incorrect") ?? nodes[0];
        if (!first) return r;
        if (first.status == "correct") {
            r.push({ char: first.val, kind: LetterKind.COLLECT } as AutoCompleate);
        } else if (first.status == "incorrect") {
            r.push({ char: first.val, kind: LetterKind.INCOLLECT } as AutoCompleate);
        } else {
            r.push({ char: first.val, kind: LetterKind.EMPTY } as AutoCompleate);
        }
        return getCorrectNodes(first.children, r);
    };

    return { toMoraWithStatus, toAutoCompleate };
}