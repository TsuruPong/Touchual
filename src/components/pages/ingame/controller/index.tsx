"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Mora } from "manimani";
import { useGetApproxSentenceQuery } from "@/libs/graphql/generated";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useTypingValidator } from "./hook/useTypingValidator";
import { useTypingCounter } from "./hook/useTypingCounter";
import { useIndicator } from "./hook/useIndicator";
import { InGamePresentation } from "../presentation";
import { useTokenizer } from "./hook/useTokenizer";
import { MoraWithStatus } from "./type/extends/mora";

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
    const [autoCompleate, setAutoCompleate] = React.useState<string>("");
    //const [level, setLevel] = React.useState<number>(1);
    //const [difficulty, setDifficulty] = React.useState<number>(1.0);
    const { totalCounter, correctCounter, incorrectCounter } =
        useTypingCounter();
    const { wpm, acc } = useIndicator();

    const { data, error, loading, refetch } = useGetApproxSentenceQuery({
        variables: { level: 1, difficulty: 1.0 },
    });

    React.useEffect(() => {
        const sentence = data?.getApproxSentence || undefined;
        if (!sentence?.text && !sentence?.ruby) return;
        setSentence(() => ({
            text: sentence.text,
            ruby: sentence.ruby,
        }));
    }, [loading, data]);

    React.useEffect(() => {
        convertJaToRomajiTokens(sentence.text).then((moras) => {
            setMoras(() => toMoraWithStatus(moras));
        });
    }, [sentence]);

    const toMoraWithStatus = (moras: Mora[]): MoraWithStatus[] => {
        return moras.map((mora) => ({
            ...mora,
            status: "unanswered",
        }));
    };

    React.useEffect(() => {
        for (const input of inputs) {
            if (input.code == "Escape") continue;
            totalCounter.increment();
            if (isTypingCorrect(moras, input.code)) {
                correctCounter.increment();
                // statusを変更したmoraを生成する
            } else {
                incorrectCounter.increment();
                // statusを変更したmoraを生成する
                return;
            }
        }
    }, [inputs]);

    const forward = () => {
        router.push("/result");
    };

    const backward = () => {
        router.push("/top");
    };

    return (
        <InGamePresentation
            sentence={sentence}
            autocompleates={[]}
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
