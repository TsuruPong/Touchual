import { useCounter } from "@/hooks/useCounter";
import { MoraNodeWithStatus, MoraWithStatus } from "../type/extends/mora";

export const useTypingHandler = (
    moras: MoraWithStatus[],
    setMoras: (moras: MoraWithStatus[] | (() => MoraWithStatus[])) => void,
    updateCorrect: (moras: MoraWithStatus[], input: string) => MoraWithStatus[],
    updateIncorrect: (moras: MoraWithStatus[]) => MoraWithStatus[]
) => {
    const { total, correct, incorrect} = counter();
    const { isTypingCorrect } = validator();
    const handleTyping = (event: KeyboardEvent) => {
        console.log(moras);
        
        if (moras.length == 0) return;
        let m: MoraWithStatus[] = [...moras];
        if (m.length == 0) return;
        total.increment();
        if (isTypingCorrect(m, event.key)) {
            correct.increment();
            m = updateCorrect(m, event.key);
        } else {
            incorrect.increment();
            m = updateIncorrect(m);
        }
        setMoras(() => m);
    }

    return { total: total.count, correct: correct.count, incorrect: incorrect.count, handleTyping }
}

const counter = () => {
    const createCounter = () => {
        const { count, increment } = useCounter();
        return { count, increment }
    }
    return {
        total: createCounter(), 
        correct: createCounter(), 
        incorrect: createCounter()
    }
}

const validator = () => {
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