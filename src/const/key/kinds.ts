export const KeyKind = {
    STANDARD: "standard",
    REGULAR: "regular",
    LARGE: "large",
    BIG: "big",
    HUGE: "huge",
    SPACE: "space"
} as const;

export type KeyKindType = typeof KeyKind[keyof typeof KeyKind];