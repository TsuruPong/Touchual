import { MoraNodeWithStatus, MoraWithStatus } from "@/types/extends/manimani";

export const useTypingValidator = () => {
    const isTypingCorrect = (moras: MoraWithStatus[], input: string): boolean => {
        const targetMora = moras.find(mora => mora.status != "correct");
        if (!targetMora?.node) throw new Error("illegal parameter");
        const targetMoraNodes = findTargetMoraNodeRecursively(targetMora.node);
        const prevMora = moras.find(mora => mora.pos == targetMora.pos - 1);
        if (prevMora?.from == "っ" && isShortConsonant(prevMora.node)) {
            const symbom = getShortConsonantSymbol(prevMora.node);
            return input == symbom.val == targetMoraNodes.some(moranode => moranode.val == input);
        }
        if (targetMora.from == "ん") {
            const nextMora = moras.find(mora => mora.pos == targetMora.pos + 1);
            if (nextMora) {
                const nextMoraNodes = findTargetMoraNodeRecursively(nextMora.node);
                return targetMoraNodes.some(moranode => moranode.val == input) || nextMoraNodes.some(moranode => moranode.val == input)
            }
        }
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
    const isShortConsonant = (nodes: MoraNodeWithStatus[]): boolean => {
        return nodes.find(node => node.status == "correct")?.children.length == 0;
    }
    const getShortConsonantSymbol = (nodes: MoraNodeWithStatus[]): MoraNodeWithStatus => {
        const symbol = nodes.find(node => node.status == "correct");
        if (!symbol) throw new Error(`illegal parameter`);
        return symbol;
    }
    return { isTypingCorrect }
}