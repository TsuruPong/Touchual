"use client";

import * as React from "react";
import { CountDown } from "@/components/templates/countdown";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";

export const CountDownContainer: React.FC<{
    forward: () => void;
    backward: () => void;
}> = ({ forward, backward }) => {
    const { inputs } = useKeyboardInput();

    React.useEffect(() => {
        if (inputs.some((k) => k.code == "Escape")) {
            backward();
        }
    }, [inputs]);

    return <CountDown handleTimeUp={forward} />;
};
