import { MoraNodeWithStatus, MoraWithStatus } from "../type/extends/mora"

export const useTypingValidator= () => {
    const isTypingCorrect = (moras: MoraWithStatus[], input: string): boolean => {
        const targetMora = moras.find(mora => mora.status == "unanswered");
        const targetMoraNodes = findTargetMoraNodeRecursively([]);
        return targetMoraNodes.some(moranode => moranode.val == input);
    }
    const findTargetMoraNodeRecursively = (nodes: MoraNodeWithStatus[]): MoraNodeWithStatus[] => {
        return nodes;
    }
    return { isTypingCorrect }
}