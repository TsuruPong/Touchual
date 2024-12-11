export const LetterKind = {
    EMPTY: "empty",
    COLLECT: "collect",
    INCOLLECT: "incollect",
} as const;

export type LetterKind = (typeof LetterKind)[keyof typeof LetterKind];