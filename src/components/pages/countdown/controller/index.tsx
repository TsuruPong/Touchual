"use client";

import * as React from "react";

import { CountDownPresentation } from "../presentation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";

export const CountDownContainer: React.FC = () => {
    const { inputs } = useKeyboardInput();
    const router = useRouter();

    React.useEffect(() => {
        if (inputs.some((k) => k.code == "Escape")) {
            backward();
        }
    }, [inputs]);

    const forward = () => {
        router.push("/game");
    };
    const backward = () => {
        router.push("/top");
    };

    return <CountDownPresentation handleTimeUp={forward} />;
};
