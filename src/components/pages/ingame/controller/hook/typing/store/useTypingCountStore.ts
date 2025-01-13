import { create } from "zustand"; 

type TypingCountStore = {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

const useTypingCountStore = () => {
    return create<TypingCountStore>((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set(() => ({ count: 0 })),
    }));
};

export const useTotalTypingCountStore = useTypingCountStore();
export const useTotalCorrectTypingCountStore = useTypingCountStore();
export const useTotalIncorrectTypingCountStore = useTypingCountStore();
export const usePresentCorrectTypingCountStore = useTypingCountStore();
export const usePresentIncorrectTypingCountStore = useTypingCountStore();