"use client";

import * as React from "react";
import { KanaText } from "@/components/elements/text";

export const Top: React.FC<{}> = ({}) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="mx-auto my-0">
                <KanaText>スペースキーを押下</KanaText>
            </div>
        </div>
    );
};
