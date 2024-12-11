"use client";

import * as React from "react";

import { Letter } from "@/components/pages/ingame/presentation/letter";
import { AutoCompleate as AutoCompleateType } from "./type";

export const AutoCompleate: React.FC<{
    autocompleates: AutoCompleateType[];
}> = ({ autocompleates }) => {
    return autocompleates.map((a, i) => (
        <Letter key={i} letter={a.char} kind={a.kind} />
    ));
};
