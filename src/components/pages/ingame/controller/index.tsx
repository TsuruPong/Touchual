"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useGetApproxSentenceQuery } from "@/libs/graphql/generated";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useIndicator } from "./hook/useIndicator";
import { InGamePresentation } from "../presentation";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import { useMoraHandler } from "./hook/useMoraHandler";
import { useTypingHandler } from "./hook/useTypingHandler";
import { useMoraStore } from "./hook/useMoraStore";

export const InGameContainer: React.FC = () => {
    const router = useRouter();
    const moras = useMoraStore((state) => state.moras);
    const updateMoras = useMoraStore((state) => state.updateMoras);
    const [sentence, setSentence] = React.useState<{
        text: string;
        ruby: string;
    }>({ text: "", ruby: "" });
    const moraHandler = useMoraHandler();
    const typingHandler = useTypingHandler(
        moraHandler.updator.updateCorrect,
        moraHandler.updator.updateIncorrect
    );
    const { time, start } = useTimer(TimerKind.SUB, 60);
    const { wpm, acc } = useIndicator(
        typingHandler.total,
        typingHandler.correct,
        typingHandler.incorrect,
        time
    );

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
        moraHandler.tokenizer.toTokens(sentence).then((moras) => {
            updateMoras(moraHandler.converter.toMoraWithStatus(moras));
        });
    }, [sentence.ruby]);

    React.useEffect(() => {
        convertTokens();
    }, [convertTokens]);

    if (moras.length != 0 && moras.every((m) => m.status == "correct")) {
        refetch({
            level: 0,
            difficulty: 0,
        });
    }

    const handleKeydown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key == "Escape") {
                backward();
            }
            typingHandler.handleTyping(event);
        },
        [moras]
    );

    useKeyboardInput(handleKeydown);

    const forward = React.useCallback(() => {
        //router.push("/result");
    }, [router]);

    const backward = React.useCallback(() => {
        router.push("/top");
    }, [router]);

    React.useEffect(() => {
        start();
    }, []);

    if (time < 0) {
        stop();
        forward();
    }

    return (
        <InGamePresentation
            sentence={sentence}
            autocompleates={moraHandler.converter.toAutoCompleate(moras)}
            time={time}
        />
    );
};
