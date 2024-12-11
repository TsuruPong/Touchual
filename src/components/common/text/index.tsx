"use client";
import * as React from "react";
import { Noto_Sans_Javanese } from "next/font/google";
const noto = Noto_Sans_Javanese({ subsets: ["latin"], weight: "500" });

type Props = React.ComponentProps<"label">;
export const EngText: React.FC<Props> = (props: Props) => {
    return <label className={`${noto.className} text-white`} {...props} />;
};

export const KanaText: React.FC<Props> = (props: Props) => {
    return <label className={`${noto.className} text-white`} {...props} />;
};
