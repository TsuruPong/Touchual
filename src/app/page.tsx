"use client";
import { useScreenStateMachine } from "@/hooks/useScreenStateMachine";

export default function Home() {
    const { Current, forward, backward } = useScreenStateMachine();
    return <Current forward={forward} backward={backward} />;
}
