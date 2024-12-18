import { MoraNodeWithStatus, MoraWithStatus } from "../type/extends/mora"

export const useUpdateMora = () => {
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

    return { updateCorrect, updateIncorrect };
}