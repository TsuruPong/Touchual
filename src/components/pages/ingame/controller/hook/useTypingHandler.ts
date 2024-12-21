import { useCounter } from "@/hooks/useCounter";
import { MoraNodeWithStatus, MoraWithStatus } from "../type/extends/mora";
import { useMoraStore } from "./useMoraStore";
import React from "react";

export const useTypingHandler = (
    updateCorrect: (moras: MoraWithStatus[], input: string) => MoraWithStatus[],
    updateIncorrect: (moras: MoraWithStatus[]) => MoraWithStatus[]
) => {
    const moras = useMoraStore((state) => state.moras);
    const moraRef = React.useRef(moras);
    const updateMoras = useMoraStore((state) => state.updateMoras);
    const { total, correct, incorrect} = counter();
    const { isTypingCorrect } = validator();
    const handleTyping = (event: KeyboardEvent) => {
        const target = moraRef.current;
        if (target.length == 0) return;
        let m: MoraWithStatus[] = [...target];
        if (m.length == 0) return;
        total.increment();
        if (isTypingCorrect(m, event.key)) {
            correct.increment();
            m = updateCorrect(m, event.key);
        } else {
            incorrect.increment();
            m = updateIncorrect(m);
        }
        updateMoras(m);
    }

    React.useEffect(() => {
        moraRef.current = moras;
    }, [moras])

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