"use client";

import * as React from "react";
import { ResultPresentation } from "../presentation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";

export const ResultContainer: React.FC = () => {
    const router = useRouter();

    useKeyboardInput((event: KeyboardEvent) => {
        if (event.code == "Escape") {
            backward();
        }
        if (event.code == "Space") {
            forward();
        }
    });

    const forward = () => {
        router.push("/top");
    };
    const backward = () => {
        router.push("/top");
    };

    return <ResultPresentation />;
};
