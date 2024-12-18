"use client";

import * as React from "react";

import { CountDownPresentation } from "../presentation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";

export const CountDownContainer: React.FC = () => {
    const router = useRouter();

    useKeyboardInput((event: KeyboardEvent) => {
        if (event.code == "Escape") {
            backward();
        }
    });

    const forward = () => {
        router.push("/game");
    };
    const backward = () => {
        router.push("/top");
    };

    return <CountDownPresentation handleTimeUp={forward} />;
};
