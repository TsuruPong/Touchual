"use client";
import {
    ScreenStateKinds,
    ScreenStateMachine,
} from "@/feature/boundaries/transitions/screen/machine";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { TimerKind, useTimer } from "@/hooks/useTimer";
import { useRouter } from "next/navigation";
import * as React from "react";

export const CountDown: React.FC = () => {
    const { time, start } = useTimer(TimerKind.SUB, 3);
    const { inputs } = useKeyboardInput();
    const router = useRouter();
    const machine = new ScreenStateMachine(ScreenStateKinds.COUNTDOWN, router);
    React.useEffect(() => {
        start();
    }, []);
    React.useEffect(() => {
        if (time < 0) {
            machine.forward();
        }
        if (inputs.some((k) => k == "Escape")) {
            machine.backward();
        }
    }, [inputs, time]);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto my-0">{time}</div>
        </div>
    );
};
