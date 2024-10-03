import { create } from "zustand"

export type Incollect = {
    key: string | undefined,
    index: number | undefined
}

type State = {
    incollect: Incollect,
    store: (incollect: Incollect) => void,
    reset: () => void
}

export const useIncollectStore = create<State>()((set) => ({
    incollect: { key: undefined, index: undefined },
    store: (incollect: Incollect) => 
        set(() => {
            return {incollect}
        }),
    reset: () => 
        set(() => {
            return {incollect: {key: undefined, index: undefined}}
        }),
}));