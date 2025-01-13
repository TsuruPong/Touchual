import {
    usePresentCorrectTypingCountStore,
    usePresentIncorrectTypingCountStore,
    useTotalCorrectTypingCountStore,
    useTotalIncorrectTypingCountStore,
    useTotalTypingCountStore
} from "./store/useTypingCountStore";

export const useTypingCounter = () => {
    type Props = {
        count: number;
        increment: () => void;
        reset: () => void;
    }

    const createCounter = (props: Props) => {
        const increment = () => {
            props.increment();
        }

        const reset = () => {
            props.reset();
        }
        return { count: props.count, increment, reset };
    }

    const tc = useTotalTypingCountStore(state => state.count);
    const ti = useTotalTypingCountStore(state => state.increment);
    const tr = useTotalTypingCountStore(state => state.reset);
    const tcc = useTotalCorrectTypingCountStore(state => state.count);
    const tci = useTotalCorrectTypingCountStore(state => state.increment);
    const tcr = useTotalCorrectTypingCountStore(state => state.reset);
    const tic = useTotalIncorrectTypingCountStore(state => state.count);
    const tii = useTotalIncorrectTypingCountStore(state => state.increment);
    const tir = useTotalIncorrectTypingCountStore(state => state.reset);
    const pcc = usePresentCorrectTypingCountStore(state => state.count);
    const pci = usePresentCorrectTypingCountStore(state => state.increment);
    const pcr = usePresentCorrectTypingCountStore(state => state.reset);
    const pic = usePresentIncorrectTypingCountStore(state => state.count);
    const pii = usePresentIncorrectTypingCountStore(state => state.increment);
    const pir = usePresentIncorrectTypingCountStore(state => state.reset);
    
    return {
        general: {
            total: createCounter({ count: tc, increment: ti, reset: tr }),
            correct: createCounter({ count: tcc, increment: tci, reset: tcr }),
            incorrect: createCounter({ count: tic, increment: tii, reset: tir })
        },
        present: {
            correct: createCounter({ count: pcc, increment: pci, reset: pcr }),
            incorrect: createCounter({ count: pic, increment: pii, reset: pir })
        }
    }
}