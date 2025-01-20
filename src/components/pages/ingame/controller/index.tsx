"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useIndicator } from "./hook/useIndicator";
import { InGamePresentation } from "../presentation";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import { useTypingTheme } from "./hook/useTypingTheme";
import { useTypingThemeStore } from "./hook/useTypingThemeStore";
import { useTypingCounter } from "./hook/typing/useTypingCounter";
import { useTypingHandler } from "./hook/typing/useTypingHandler";
import { useAutoCompleate } from "./hook/useAutoCompleate";

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

    const { time, start, stop } = useTimer(TimerKind.SUB, 60);
    const { calcWpm, calcAcc, calcProgress } = useIndicator();
    const [level, setLevel] = React.useState<number>(1);
    const [difficulty, setDifficulty] = React.useState<number>(0);

    const { general, present } = useTypingCounter();
    const { handleTyping } = useTypingHandler();
    const { toAutoCompleate } = useAutoCompleate();

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
        const indicator = {
            total: general.total.count,
            correct: present.correct.count,
            incorrect: present.incorrect.count,
            time,
        };
        const progress = calcProgress(level, difficulty, indicator);
        fetchCurrectTypingTheme(
            progress.level,
            progress.difficulty,
            typingThemeId
        );
        setLevel(() => progress.level);
        setDifficulty(() => progress.difficulty);
        present.correct.reset();
        present.incorrect.reset();
    }, [shouldFetch]);

    const handleKeydown = React.useCallback((event: KeyboardEvent) => {
        if (event.key == "Escape") {
            backward();
        }
        handleTyping(event);
    }, []);

    useKeyboardInput(handleKeydown);

    const autocompleate = React.useMemo(
        () => toAutoCompleate(typingThemeMoras),
        [typingThemeMoras]
    );

    const forward = React.useCallback(() => {
        router.push("/result");
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
            autocompleates={autocompleate}
            time={time}
        />
    );
};
