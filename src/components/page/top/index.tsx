"use client";

import * as React from "react";
import { Top } from "@/components/templates/top";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";

export const TopContainer: React.FC<{
    forward: () => void;
    backward: () => void;
}> = ({ forward, backward }) => {
    const { inputs, clear } = useKeyboardInput();
    React.useEffect(() => {
        if (inputs.some((k) => k.code == "Space")) {
            forward();
            clear();
        }
        if (inputs.some((k) => k.code == "Escape")) {
            backward();
            clear();
        }
    }, [inputs]);
    return <Top />;
};
