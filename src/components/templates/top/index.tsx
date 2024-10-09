"use client";
import {
    ScreenStateKinds,
    ScreenStateMachine,
} from "@/feature/boundaries/transitions/screen/machine";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";
import * as React from "react";

export const Top: React.FC = () => {
    const { inputs } = useKeyboardInput();
    const router = useRouter();
    const machine = new ScreenStateMachine(ScreenStateKinds.INIT, router);
    React.useEffect(() => {
        console.log(inputs);
        if (inputs.some((k) => k.code == "Space")) {
            machine.forward();
        }
        if (inputs.some((k) => k.code == "Escape")) {
            machine.backward();
        }
    }, [inputs]);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto my-0">スペースキーを押下でスタート</div>
        </div>
    );
};
