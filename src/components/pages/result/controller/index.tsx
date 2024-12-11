"use client";

import * as React from "react";
import { ResultPresentation } from "../presentation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";

export const ResultContainer: React.FC = () => {
    const { inputs } = useKeyboardInput();
    const router = useRouter();

    React.useEffect(() => {
        if (inputs.some((k) => k.code == "Space")) {
            forward();
        }
        if (inputs.some((k) => k.code == "Escape")) {
            backward();
        }
    }, [inputs]);

    const forward = () => {
        router.push("/top");
    };
    const backward = () => {
        router.push("/top");
    };

    return <ResultPresentation />;
};
