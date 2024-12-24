"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useIndicator } from "./hook/useIndicator";
import { InGamePresentation } from "../presentation";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import { useMoraHandler } from "./hook/useMoraHandler";
import { useTypingHandler } from "./hook/useTypingHandler";
import { useTypingTheme } from "./hook/useTypingTheme";
import { useTypingThemeStore } from "./hook/useTypingThemeStore";

export const InGameContainer: React.FC = () => {
    const router = useRouter();

    const { fetchTypingTheme } = useTypingTheme();
    const typingThemeId = useTypingThemeStore((state) => state.id);
    const updateTypingThemeId = useTypingThemeStore((state) => state.updateId);
    const typingThemeText = useTypingThemeStore((state) => state.text);
    const updateTypingThemeText = useTypingThemeStore(
        (state) => state.updateText
    );
    const typingThemeRuby = useTypingThemeStore((state) => state.ruby);
    const updateTypingThemeRuby = useTypingThemeStore(
        (state) => state.updateRuby
    );
    const typingThemeMoras = useTypingThemeStore((state) => state.moras);
    const updateTypingThemeMoras = useTypingThemeStore(
        (state) => state.updateMoras
    );

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

    const fetchCurrectTypingTheme = async (
        level: number,
        difficulty: number,
        id?: number
    ) => {
        const theme = await fetchTypingTheme(level, difficulty, id);
        updateTypingThemeId(theme.id);
        updateTypingThemeText(theme.text);
        updateTypingThemeRuby(theme.ruby);
        updateTypingThemeMoras(theme.moras);
    };

    const shouldFetch =
        typingThemeMoras.length == 0 ||
        (typingThemeMoras.length != 0 &&
            typingThemeMoras.every((m) => m.status == "correct"));

    React.useEffect(() => {
        if (!shouldFetch) return;
        fetchCurrectTypingTheme(1, 1.0, typingThemeId);
    }, [shouldFetch]);

    const handleKeydown = React.useCallback((event: KeyboardEvent) => {
        if (event.key == "Escape") {
            backward();
        }
        typingHandler.handleTyping(event);
    }, []);

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
            sentence={{ text: typingThemeText, ruby: typingThemeRuby }}
            autocompleates={moraHandler.converter.toAutoCompleate(
                typingThemeMoras
            )}
            time={time}
        />
    );
};
