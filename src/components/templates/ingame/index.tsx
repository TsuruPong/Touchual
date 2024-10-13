"use client";

import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suggestion } from "../../elements/suggestion";
import { InGameTimer } from "./timer";
import { ILetter } from "@/domains/sentences/letter";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { LetterKind } from "@/components/elements/letter";
import { useAutoCompleate } from "@/components/templates/ingame/hook/useAutoComplete";
import { useIncollectStore } from "@/components/templates/ingame/hook/useIncollectStore";
import { useTypingValidator } from "@/components/templates/ingame/hook/useTypingValidator";
import { useLetter } from "@/components/templates/ingame/hook/useLetter";
import {
    useCollectTypingCounter,
    useIncollectTypingCounter,
    useTotalTypingCounter,
} from "./hook/useTypingCounter";
import { useIndicator } from "./hook/useIndicator";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import { EngText, KanaText } from "@/components/elements/text";

export const InGame: React.FC<{
    sentence: { text: string; ruby: string };
    handleTimeup: () => void;
    handleRefetch: (level: number, difficulty: number) => void;
}> = ({ sentence, handleTimeup, handleRefetch }) => {
    const { inputs, clear } = useKeyboardInput();
    const { generate } = useLetter();
    const { suggestion } = useAutoCompleate();
    const { validateTyping } = useTypingValidator();
    const [letter, setLetter] = React.useState<ILetter>();
    const [collects, setCollects] = React.useState<string[]>([]);
    const { incollect, store, reset } = useIncollectStore();
    const [autoCompleate, setAutoCompleate] = React.useState<string>("");
    const [kinds, setKinds] = React.useState<LetterKind[]>([]);
    const [level, setLevel] = React.useState<number>(1);
    const [difficulty, setDifficulty] = React.useState<number>(1.0);
    const { totalCount, incTotalCount } = useTotalTypingCounter();
    const { collectCount, incCollectCount } = useCollectTypingCounter();
    const { incollectCount, incIncollectCount } = useIncollectTypingCounter();
    const { wpm, acc } = useIndicator();

    React.useEffect(() => {
        setLetter(() => generate(sentence.ruby));
    }, [sentence.ruby]);

    React.useEffect(() => {
        if (!letter) return;
        const newSuggestion = suggestion(letter, collects);
        if (newSuggestion !== autoCompleate) {
            setAutoCompleate(newSuggestion);
        }
    }, [letter, collects, incollect.index]);

    React.useEffect(() => {
        if (!letter) return;
        const next = letter.getNext();
        if (!next) return;
        if (inputs.length == 0) return;
        let c = collects;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].code == "Escape") continue;
            incTotalCount();
            if (validateTyping(next, c, inputs[i].key)) {
                c = [...c, inputs[i].key];
                reset();
                incCollectCount();
            } else {
                store({ key: inputs[i].key, index: c.length + i });
                incIncollectCount();
                break;
            }
        }
        clear();
        if (collects !== c) {
            setCollects(() => c);
        }
    }, [inputs]);

    React.useEffect(() => {
        let kinds: LetterKind[] = [];
        const acs = autoCompleate.split("");
        for (let i = 0; i < acs.length; i++) {
            if (i == incollect.index) {
                kinds.push(LetterKind.INCOLLECT);
            } else if (collects[i]) {
                kinds.push(LetterKind.COLLECT);
            } else {
                kinds.push(LetterKind.EMPTY);
            }
        }
        setKinds(() => kinds);
    }, [sentence, autoCompleate, collects, incollect.index]);

    return (
        <div className="h-full grid grid-rows-[0.1fr,1fr,0.1fr] grid-flow-row gap-7">
            <div />
            <div className="flex justify-center items-center">
                <div className="w-fit flex flex-col">
                    <div className="select-none text text-2xl w-full h-[40px] flex items-center">
                        <InGameTimer callback={handleTimeup} />
                    </div>
                    <div className="select-none text text-2xl w-full flex items-center">
                        <EngText>{sentence?.text && sentence.text}</EngText>
                    </div>
                    <div className="select-none text text-2xl w-full flex items-center">
                        <KanaText>{sentence?.ruby && sentence.ruby}</KanaText>
                    </div>
                    <div className="select-none text text-2xl w-full h-[70px] flex items-center">
                        {autoCompleate && (
                            <Suggestion
                                suggestion={autoCompleate}
                                kinds={kinds}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div />
        </div>
    );
};
