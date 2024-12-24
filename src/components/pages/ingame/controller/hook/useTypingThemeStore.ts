import { create } from "zustand"; 
import { MoraWithStatus } from "@/types/extends/manimani";

type TypingThemeStore = {
    id: number;
    text: string;
    ruby: string;
    moras: MoraWithStatus[];
    updateId: (id: number) => void;
    updateText: (text: string) => void;
    updateRuby: (ruby: string) => void;
    updateMoras: (moras: MoraWithStatus[]) => void;
}

export const useTypingThemeStore = create<TypingThemeStore>((set) => ({
    id: 0,
    text: "",
    ruby: "",
    moras: [],
    updateId: (id: number) => set(() => ({ id: id })),
    updateText: (text: string) => set(() => ({ text: text })),
    updateRuby: (ruby: string) => set(() => ({ ruby: ruby })),
    updateMoras: (moras: MoraWithStatus[]) => set(() => ({ moras: moras }))
}))