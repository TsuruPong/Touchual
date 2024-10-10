"use client";
import * as React from "react";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import { EngText } from "@/components/elements/text";

export const CountDown: React.FC<{
    forward: () => void;
    backward: () => void;
}> = ({ forward, backward }) => {
    const { time, start } = useTimer(TimerKind.SUB, 3);
    const { inputs } = useKeyboardInput();
    React.useEffect(() => {
        start();
    }, []);
    React.useEffect(() => {
        if (time <= 0) {
            forward();
        }
        if (inputs.some((k) => k.code == "Escape")) {
            backward();
        }
    }, [inputs, time]);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto my-0">
                <EngText>{time}</EngText>
            </div>
        </div>
    );
};
