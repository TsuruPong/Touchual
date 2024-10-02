"use client";

import * as React from "react";

import { Letter, LetterKind } from "@/components/elements/letter";

export const Suggestion: React.FC<{
    suggestion: string;
    kinds: LetterKind[];
}> = ({ suggestion, kinds }) => {
    return suggestion
        .split("")
        .map((l, i) => <Letter key={i} letter={l} kind={kinds[i]} />);
};
