import { useCounter } from "@/hooks/useCounter"

export const useTypingCounter = () => {
    const createCounter = () => {
        const { count, increment } = useCounter();
        return { count, increment }
    }

    return {
        totalCounter: createCounter(), 
        correctCounter: createCounter(), 
        incorrectCounter: createCounter()
    }
}