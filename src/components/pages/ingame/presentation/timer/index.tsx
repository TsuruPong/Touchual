"use client";

import * as React from "react";

type InGameTimerProp = {
    time: number;
};

export const InGameTimer: React.FC<InGameTimerProp> = ({ time }) => {
    return <label className="text-amber-400">{time}</label>;
};
