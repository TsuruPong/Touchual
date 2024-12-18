"use client";

import * as React from "react";
import { TopPresentation } from "../presentation";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";

export const TopContainer: React.FC = () => {
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
        router.push("/cd");
    };
    const backward = () => {};

    return <TopPresentation />;
};
