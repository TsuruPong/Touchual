import { create } from "zustand"; 
import { MoraNodeWithStatus, MoraWithStatus } from "../type/extends/mora";

type MoraStore = {
    moras: MoraWithStatus[];
    updateMoras: (moras: MoraWithStatus[]) => void;
}

export const useMoraStore = create<MoraStore>((set) => ({
    moras: [],
    updateMoras: (moras: MoraWithStatus[]) => set(() => ({ moras: [...moras] }))
}))