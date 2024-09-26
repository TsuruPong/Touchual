"use client"
import * as React from "react";

export const TimerKind = {
    ADD: (prev: number) => prev + 1,
    SUB: (prev: number) => prev -1
} as const;

type TimerKind = typeof TimerKind[keyof typeof TimerKind];

export const useTimer = (kind: TimerKind, init: number) => {
    const [time, setTime] = React.useState<number>(init);
    const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);
    const start = () => {
        if (!intervalId) {
            const id = setInterval(() => {
                setTime(kind);
            }, 1000);
            setIntervalId(id);
        }
    }

    const stop = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }

    const reset = () => {
        stop();
        setTime(init);
    }

    React.useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [intervalId])

    return { time, start, stop, reset };
}