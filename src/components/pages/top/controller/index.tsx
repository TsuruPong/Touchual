"use client";

import * as React from "react";
import { TopPresentation } from "../presentation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";

export const TopContainer: React.FC = () => {
    const { inputs, clear } = useKeyboardInput();
    const router = useRouter();

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

    const forward = () => {
        router.push("/cd");
    };
    const backward = () => {};

    return <TopPresentation />;
};
