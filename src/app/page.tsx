"use client";

import { CountDownContainer } from "@/components/page/countdown";
import { InGameContainer } from "@/components/page/ingame";
import { ResultContainer } from "@/components/page/result";
import { TopContainer } from "@/components/page/top";
import {
    CountdownScreenState,
    IngameScreenState,
    InitScreenState,
    ResultScreenState,
} from "@/feature/boundaries/transitions/screen/state";
import { useScreenStateMachine } from "@/hooks/useScreenStateMachine";

export default function Home() {
    const { current, forward, backward } = useScreenStateMachine();
    if (current instanceof InitScreenState) {
        return <TopContainer forward={forward} backward={backward} />;
    }
    if (current instanceof CountdownScreenState) {
        return <CountDownContainer forward={forward} backward={backward} />;
    }
    if (current instanceof IngameScreenState) {
        return <InGameContainer forward={forward} backward={backward} />;
    }
    if (current instanceof ResultScreenState) {
        return <ResultContainer forward={forward} backward={backward} />;
    }
}
