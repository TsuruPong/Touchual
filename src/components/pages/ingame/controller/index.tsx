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
import { AutoCompleate } from "../presentation/autocompleate/type";

export const InGameContainer: React.FC = () => {
    const [sentence, setSentence] = React.useState<{
        text: string;
        ruby: string;
    }>({ text: "", ruby: "" });
    const router = useRouter();
    const { inputs, clear } = useKeyboardInput();
    const { convertJaToRomajiTokens } = useTokenizer();
    const { isTypingCorrect } = useTypingValidator();
    const [moras, setMoras] = React.useState<MoraWithStatus[]>();
    const { toMoraWithStatus, toAutoCompleate } = useMoraTypeConverter();
    const { updateCorrect, updateIncorrect } = useUpdateMora();
    const [autoCompleate, setAutoCompleate] = React.useState<AutoCompleate[]>(
        []
    );
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
        const sentence = data?.getApproxSentence || undefined;
        if (!sentence?.text && !sentence?.ruby) return;
        setSentence(() => ({
            text: sentence.text,
            ruby: sentence.ruby,
        }));
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

    React.useEffect(() => {
        if (!moras || moras.length == 0) return;
        setAutoCompleate(() => toAutoCompleate(moras));
        if (moras.every((m) => m.status == "correct")) {
            refetch({
                level: 2,
                difficulty: 2.2,
            });
            return;
        }
    }, [moras]);

    React.useEffect(() => {
        if (inputs.length == 0) return;
        if (inputs.some((key) => key.code == "Escape")) {
            backward();
            return;
        }
        if (!moras || moras.length == 0) return;
        let m: MoraWithStatus[] = [...moras];
        for (const input of inputs) {
            totalCounter.increment();
            if (isTypingCorrect(moras, input.key)) {
                correctCounter.increment();
                m = updateCorrect(m, input.key);
            } else {
                incorrectCounter.increment();
                m = updateIncorrect(m);
                break;
            }
        }
        console.log(m);
        setMoras(() => m);
        clear();
    }, [inputs]);

    return (
        <InGamePresentation
            sentence={sentence}
            autocompleates={autoCompleate}
            handleTimeup={forward}
            handleRefetch={(level: number, difficulty: number) =>
                refetch({
                    level: level,
                    difficulty: difficulty,
                })
            }
        />
    );
};
