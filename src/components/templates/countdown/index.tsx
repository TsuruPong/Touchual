"use client";
import { ScreenStateMachine } from "@/feature/boundaries/transitions/screen/machine";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import * as React from "react";

export const CountDown: React.FC = () => {
    const { time } = useTimer(TimerKind.SUB, 3);
    const { inputs } = useKeyboardInput();
    const machine = new ScreenStateMachine();
    React.useEffect(() => {
        if (time < 0) {
            machine.forward();
        }
        if (inputs.some((k) => k == "Escape")) {
            machine.backward();
        }
    }, [inputs]);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto my-0">{time}</div>
        </div>
    );
};
