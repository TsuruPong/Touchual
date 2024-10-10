"use client";
import * as React from "react";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { KanaText } from "@/components/elements/text";

export const Top: React.FC<{
    forward: () => void;
    backward: () => void;
}> = ({ forward, backward }) => {
    const { inputs } = useKeyboardInput();
    React.useEffect(() => {
        console.log(inputs);
        if (inputs.some((k) => k.code == "Space")) {
            forward;
        }
        if (inputs.some((k) => k.code == "Escape")) {
            backward;
        }
    }, [inputs]);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto my-0">
                <KanaText>スペースキーを押下</KanaText>
            </div>
        </div>
    );
};
