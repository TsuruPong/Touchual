import { MoraNodeWithStatus, MoraWithStatus } from "@/types/extends/manimani";

export const useMoraUpdater = () => {
    const updateCorrect = (moras: MoraWithStatus[], input: string): MoraWithStatus[] => {
        const copy = [...moras];
        const target = copy.find(m => m.status != "correct");
        if (!target?.node) return copy;
        if (target.from == "ん") {
            const next = copy.find(mm => mm?.pos == target?.pos + 1);
            if (next) {
                const targetMoraNode = findTargetMoraNodeRecursively(target.node);
                const nextMoraNode = findTargetMoraNodeRecursively(next.node);
                if (targetMoraNode.some(ctmn => ctmn.val == input)) {
                    targetMoraNode.map(n => {
                        if (n.val == input) {
                            n.status = "correct";
                            if (n.children.length == 0 && n.pos == 1) {
                                target.status = "correct";
                            }
                        } else {
                            n.status = "unanswered";
                        }
                    });
                }
                if (nextMoraNode.some(ctmn => ctmn.val == input)) {
                    target.status = "correct";
                    nextMoraNode.map(n => {
                        if (n.val == input) {
                            n.status = "correct";
                            if (n.children.length == 0 && n.pos == 1) {
                                target.status = "correct";
                            }
                        } else {
                            n.status = "unanswered";
                        }
                    });
                }
                return copy;
            }
        }
        const node = findTargetMoraNodeRecursively(target.node);
        node.map(n => {
            if (n.val == input) {
                n.status = "correct";
                if (n.children.length == 0) {
                    target.status = "correct";
                }
            } else {
                n.status = "unanswered";
            }
        });
        return copy;
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