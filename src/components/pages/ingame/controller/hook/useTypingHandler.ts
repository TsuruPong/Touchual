import React from "react";
import { useCounter } from "@/hooks/useCounter";
import { MoraNodeWithStatus, MoraWithStatus } from "@/types/extends/manimani";
import { useTypingThemeStore } from "./useTypingThemeStore";
import { TimerKind, useTimer } from "@/hooks/useTimer";

export const useTypingHandler = (
    updateCorrect: (moras: MoraWithStatus[], input: string) => MoraWithStatus[],
    updateIncorrect: (moras: MoraWithStatus[]) => MoraWithStatus[]
) => {
    const moras = useTypingThemeStore((state) => state.moras);
    const updateMoras = useTypingThemeStore(
        (state) => state.updateMoras
    );
    const moraRef = React.useRef(moras);
    const { total, totalCorrect, totalIncorrect, presentCorrect, presentIncorrect } = counter();
    const { isTypingCorrect } = validator();
    const { time, start, reset } = useTimer(TimerKind.ADD, 0);
    const handleTyping = (event: KeyboardEvent) => {
        const target = moraRef.current;
        if (target.length == 0) return;
        let m: MoraWithStatus[] = [...target];
        if (m.length == 0) return;
        total.increment();
        if (isTypingCorrect(m, event.key)) {
            totalCorrect.increment();
            presentCorrect.increment();
            m = updateCorrect(m, event.key);
        } else {
            totalIncorrect.increment();
            presentIncorrect.increment();
            m = updateIncorrect(m);
        }
        updateMoras(m);
    }

    React.useEffect(() => {
        moraRef.current = moras;
    }, [moras]);

    const counts = {
        totals: {
            total: total.count,
            correct: totalCorrect.count,
            incorrect: totalIncorrect.count
        },
        presents: {
            correct: presentCorrect.count,
            incorrect: presentIncorrect.count,
            resetCounts: () => {
                presentCorrect.reset();
                presentIncorrect.reset();
            }        
        }
    }

    const timer = {
        presents: {
            time,
            start,
            reset
        }
    }

    return { counts, timer, handleTyping }
}

const counter = () => {
    const createCounter = () => {
        const { count, increment, decrement, reset } = useCounter();
        return { count, increment, decrement, reset };
    }
    return {
        total: createCounter(), 
        totalCorrect: createCounter(), 
        totalIncorrect: createCounter(),
        presentCorrect: createCounter(),
        presentIncorrect: createCounter()
    }
}

const validator = () => {
    const isTypingCorrect = (moras: MoraWithStatus[], input: string): boolean => {
        const targetMora = moras.find(mora => mora.status != "correct");
        if (!targetMora?.node) throw new Error("illegal parameter");
        const targetMoraNodes = findTargetMoraNodeRecursively(targetMora.node);
        const prevMora = moras.find(mora => mora.pos = targetMora.pos - 1);
        if (prevMora?.from == "っ" && isShortConsonant(prevMora.node)) {
            const symbom = getShortConsonantSymbol(prevMora.node);
            return input == symbom.val == targetMoraNodes.some(moranode => moranode.val == input);
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