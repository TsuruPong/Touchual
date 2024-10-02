"use client"

import { create } from 'zustand';

interface StoreState<Item> {
    data: Item,
    store: (n: Item) => void;
}

const useLocalStoreBase = create<StoreState<any>>((set) => ({
    data: undefined,
    store: (n) => set({data: n})
}));

export const useLocalStore = <Item> (
    selector: (state: StoreState<Item>) => StoreState<Item>,
) => useLocalStoreBase(selector);