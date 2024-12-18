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
    const { convertJaToRomajiTokens } = useTokenizer();
    const { isTypingCorrect } = useTypingValidator();
    const [moras, setMoras] = React.useState<MoraWithStatus[]>([]);
    const morasRef = React.useRef<MoraWithStatus[]>([]);
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
    }, [sentence.ruby]);

    React.useEffect(() => {
        convertTokens();
    }, [convertTokens]);

    React.useEffect(() => {
        morasRef.current = moras;
    }, [moras]);

    if (moras.length != 0 && moras.every((m) => m.status == "correct")) {
        refetch({
            level: 2,
            difficulty: 2.2,
        });
    }

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.code == "Escape") {
            backward();
        }

        let m: MoraWithStatus[] = [...morasRef.current];
        totalCounter.increment();
        if (isTypingCorrect(m, event.key)) {
            correctCounter.increment();
            m = updateCorrect(m, event.key);
        } else {
            incorrectCounter.increment();
            m = updateIncorrect(m);
        }

        setMoras(() => m);
    };

    useKeyboardInput(handleKeydown);

    const forward = React.useCallback(() => {
        router.push("/result");
    }, [router]);

    const backward = React.useCallback(() => {
        router.push("/top");
    }, [router]);

    return (
        <InGamePresentation
            sentence={sentence}
            autocompleates={toAutoCompleate(moras)}
            handleTimeup={forward}
        />
    );
};
