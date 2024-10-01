"use client";

import * as React from "react";

import { ILetter } from "@/domains/sentences/letter";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useLetter } from "@/hooks/useLetter";
import { useCollectStore } from "@/hooks/useCollectStore";
import { Letter, LetterKind } from "@/components/elements/letter";
import { Incollect, useIncollectStore } from "@/hooks/useIncollectStore";
import { useAutoCompleateSuggestion } from "@/hooks/useAutoCompleteSuggestion";
import { useTypingValidator } from "@/hooks/useTypingValidator";

type SuggestionProp = {
    sentence?: string;
    callback: () => void;
};

export const Suggestion: React.FC<SuggestionProp> = ({
    sentence,
    callback,
}) => {
    const [letter, setLetter] = React.useState<ILetter>();
    const { collects, add, clean } = useCollectStore();
    const [suggestion, setSuggestion] = React.useState<string>("");
    const { inputs, clear } = useKeyboardInput();
    const { incollect, store, reset } = useIncollectStore();
    const { generateLetter } = useLetter();
    const { generateSuggestionText } = useAutoCompleateSuggestion();
    const { validateTyping } = useTypingValidator();

    React.useEffect(() => {
        if (!letter) return;
        const next = letter.getNext();
        if (!next) return;

        for (const key of inputs) {
            if (validateTyping(next, collects, key)) {
                add(key);
                clear();
                reset();
            } else {
                const splitedSuggestion = suggestion.split("");
                if (
                    incollect.key !== splitedSuggestion[collects.length] ||
                    incollect.index !== collects.length
                ) {
                    store({
                        key: splitedSuggestion[collects.length],
                        index: collects.length,
                    });
                }
            }
        }

        return () => {};
    }, [inputs]);

    React.useEffect(() => {
        if (!sentence) {
            callback();
            return;
        }
        const newLetter = generateLetter(sentence);
        setLetter(newLetter);
        clean();
        return () => {};
    }, [sentence]);

    React.useEffect(() => {
        if (!letter) return;
        setSuggestion(() => generateSuggestionText(letter, collects));
        const sl = suggestion.split("").length;
        const cl = collects.length;
        if (sl == cl) {
            callback();
        }
        return () => {};
    }, [letter, collects, incollect.index]);

    const decideLetterKind = (
        collects: string[],
        incollect: Incollect,
        index: number
    ): LetterKind => {
        if (incollect.index == index) {
            return LetterKind.INCOLLECT;
        }
        if (collects[index]) {
            return LetterKind.COLLECT;
        }
        return LetterKind.EMPTY;
    };

    return suggestion
        .split("")
        .map((s, i) => (
            <Letter
                key={i}
                letter={s}
                kind={decideLetterKind(collects, incollect, i)}
            />
        ));
};
