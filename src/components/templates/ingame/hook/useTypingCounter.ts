import { useCounter } from "@/hooks/useCounter"

export const useTotalTypingCounter = () => {
    const {count, increment} = useCounter();
    const totalCount = count;
    const incTotalCount = increment;
    return {totalCount, incTotalCount}
}

export const useCollectTypingCounter = () => {
    const {count, increment} = useCounter();
    const collectCount = count;
    const incCollectCount = increment;
    return {collectCount, incCollectCount}
}

export const useIncollectTypingCounter = () => {
    const {count, increment} = useCounter();
    const incollectCount = count;
    const incIncollectCount = increment;
    return {incollectCount, incIncollectCount}
}