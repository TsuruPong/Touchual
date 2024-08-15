import { create } from "zustand";

type State = {
    collects: string[],
    add: (key: string) => void,
    clean: () => void
}

export const useCollectStore = create<State>()((set) => ({
    collects: [],
    add: (key: string) => set((state) => ({collects: [...state.collects, key]})),
    clean: () => set(() => ({collects: []}))
}))
