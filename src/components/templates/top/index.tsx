"use client";
import { ScreenStateMachine } from "@/feature/boundaries/transitions/screen/machine";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import * as React from "react";

export const Top: React.FC = () => {
    const { inputs } = useKeyboardInput();
    const machine = new ScreenStateMachine();
    React.useEffect(() => {
        if (inputs.some((k) => k == "Space")) {
            machine.forward();
        }
        if (inputs.some((k) => k == "Escape")) {
            machine.backward();
        }
    }, [inputs]);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto my-0">スペースキーを押下でスタート</div>
        </div>
    );
};
