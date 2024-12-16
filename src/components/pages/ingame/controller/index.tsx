"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useGetApproxSentenceQuery } from "@/libs/graphql/generated";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useTypingValidator } from "./hook/useTypingValidator";
import { useTypingCounter } from "./hook/useTypingCounter";
import { useIndicator } from "./hook/useIndicator";
import { InGamePresentation } from "../presentation";
import { useTokenizer } from "./hook/useTokenizer";
import { MoraWithStatus } from "./type/extends/mora";
import { useMoraTypeConverter } from "./hook/useMoraTypeConverter";
import { useUpdateMora } from "./hook/useUpdateMora";

export const InGameContainer: React.FC = () => {
    const [sentence, setSentence] = React.useState<{
        text: string;
        ruby: string;
    }>({ text: "", ruby: "" });
    const router = useRouter();
    const { inputs, clear } = useKeyboardInput();
    const { convertJaToRomajiTokens } = useTokenizer();
    const { isTypingCorrect } = useTypingValidator();
    const [moras, setMoras] = React.useState<MoraWithStatus[]>([]);
    const { toMoraWithStatus, toAutoCompleate } = useMoraTypeConverter();
    const { updateCorrect, updateIncorrect } = useUpdateMora();
    //const [level, setLevel] = React.useState<number>(1);
    //const [difficulty, setDifficulty] = React.useState<number>(1.0);
    const { totalCounter, correctCounter, incorrectCounter } =
        useTypingCounter();
    const { wpm, acc } = useIndicator();

    const { data, error, loading, refetch } = useGetApproxSentenceQuery({
        variables: { level: 1, difficulty: 1.0 },
    });

    const forward = React.useCallback(() => {
        //router.push("/result");
    }, []);

    const backward = React.useCallback(() => {
        router.push("/top");
    }, []);

    React.useEffect(() => {
        let ignore = false;
        const sentence = data?.getApproxSentence || undefined;
        if (!sentence?.text && !sentence?.ruby) return;
        if (!ignore) {
            setSentence(() => ({
                text: sentence.text,
                ruby: sentence.ruby,
            }));
        }
        return () => {
            ignore = true;
        };
    }, [loading, data]);

    const convertTokens = React.useCallback(() => {
        if (!sentence.ruby) return;
        convertJaToRomajiTokens(sentence.ruby).then((moras) => {
            setMoras(toMoraWithStatus(moras));
        });
    }, [sentence.text]);

    React.useEffect(() => {
        convertTokens();
    }, [convertTokens]);

    if (moras.length != 0 && moras.every((m) => m.status == "correct")) {
        refetch({
            level: 2,
            difficulty: 2.2,
        });
    }

    if (inputs.some((key) => key.code == "Escape")) {
        backward();
        return;
    }

    React.useEffect(() => {
        if (inputs.length == 0) return;
        if (
            !moras ||
            moras.length == 0 ||
            moras.every((m) => m.node.length == 0) ||
            moras.every((m) => m.status == "correct")
        ) {
            return;
        }
        let change = false;
        let m: MoraWithStatus[] = [...moras];
        for (const input of inputs) {
            totalCounter.increment();
            if (isTypingCorrect(moras, input.key)) {
                correctCounter.increment();
                m = updateCorrect(m, input.key);
                change = true;
            } else {
                incorrectCounter.increment();
                m = updateIncorrect(m);
                change = true;
                break;
            }
        }
        if (change) {
            setMoras(() => m);
        }
        clear();
    }, [inputs]);

    return (
        <InGamePresentation
            sentence={sentence}
            autocompleates={toAutoCompleate(moras)}
            handleTimeup={forward}
        />
    );
};
