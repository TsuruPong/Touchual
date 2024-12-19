"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useGetApproxSentenceQuery } from "@/libs/graphql/generated";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useIndicator } from "./hook/useIndicator";
import { InGamePresentation } from "../presentation";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import { useMora } from "./hook/useMora";
import { useTypingHandler } from "./hook/useTypingHandler";

export const InGameContainer: React.FC = () => {
    const router = useRouter();
    const [sentence, setSentence] = React.useState<{
        text: string;
        ruby: string;
    }>({ text: "", ruby: "" });
    const moraHandler = useMora(sentence);
    //const morasRef = React.useRef<MoraWithStatus[]>(moraHandler.moras);
    const typingHandler = useTypingHandler(
        moraHandler.moras,
        moraHandler.setMoras,
        moraHandler.updateCorrect,
        moraHandler.updateIncorrect
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

    if (
        moraHandler.moras.length != 0 &&
        moraHandler.moras.every((m) => m.status == "correct")
    ) {
        refetch({
            level: 0,
            difficulty: 0,
        });
    }

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key == "Escape") {
            backward();
        }
        typingHandler.handleTyping(event);
    };

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
            autocompleates={moraHandler.autocompleate}
            time={time}
        />
    );
};
