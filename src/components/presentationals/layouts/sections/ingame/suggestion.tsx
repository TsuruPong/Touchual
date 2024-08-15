"use client";

import * as React from "react";

import { ILetter } from "@/domains/sentences/letter";
import { useACS } from "@/hooks/useAutoCompleteSuggestions";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useKIA } from "@/hooks/useKeyboardInputAccuracy";
import { useLetter } from "@/hooks/useLetter";
import { useCollectStore } from "@/hooks/useCollectStore";
import {
  Letter,
  LetterKind,
} from "@/components/presentationals/elements/letter/letter";
import { Incollect, UseIncollectStore } from "@/hooks/useIncollectStore";

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
  const { incollect, store, reset } = UseIncollectStore();

  React.useEffect(() => {
    if (!letter) return;
    const next = letter.getNext();
    if (!next) return;

    for (const key of inputs) {
      if (useKIA(next, collects, key)) {
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
    const newLetter = useLetter(sentence);
    setLetter(newLetter);
    clean();
    return () => {};
  }, [sentence]);

  React.useEffect(() => {
    if (!letter) return;
    setSuggestion(() => useACS(letter, collects));
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
