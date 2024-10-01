"use client";

import { TimerKind, useTimer } from "@/hooks/useTimer";
import * as React from "react";

type InGameTimerProp = {
    callback: () => void;
};

export const InGameTimer: React.FC<InGameTimerProp> = ({ callback }) => {
    const { time, start } = useTimer(TimerKind.SUB, 60);
    const ref = React.useRef(time);

    React.useEffect(() => {
        start();
    }, []);

    React.useEffect(() => {
        ref.current = time;
        if (time <= 0) {
            stop();
            callback();
        }
    }, [time]);

    return <label className="text-amber-400">{time}</label>;
};
