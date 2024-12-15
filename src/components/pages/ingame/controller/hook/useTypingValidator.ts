import { MoraNodeWithStatus, MoraWithStatus } from "../type/extends/mora"

export const useTypingValidator= () => {
    const isTypingCorrect = (moras: MoraWithStatus[], input: string): boolean => {
        const targetMora = moras.find(mora => mora.status != "correct");
        if (!targetMora?.node) throw new Error("illegal parameter");
        const targetMoraNodes = findTargetMoraNodeRecursively(targetMora.node);
        return targetMoraNodes.some(moranode => moranode.val == input);
    }
    const findTargetMoraNodeRecursively = (nodes: MoraNodeWithStatus[]): MoraNodeWithStatus[] => {
        const n = nodes.find(n => n.status == "correct");
        if (n) {
            return findTargetMoraNodeRecursively(n.children);
        } else {
            return nodes;
        }
    }
    return { isTypingCorrect }
}