"use client";

import * as React from "react";
import { Result } from "@/components/templates/result";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";

export const ResultContainer: React.FC<{
    forward: () => void;
    backward: () => void;
}> = ({ forward, backward }) => {
    const { inputs } = useKeyboardInput();

    React.useEffect(() => {
        if (inputs.some((k) => k.code == "Space")) {
            forward();
        }
        if (inputs.some((k) => k.code == "Escape")) {
            backward();
        }
    }, [inputs]);
    return <Result />;
};
