"use client";

import * as React from "react";
import { KanaText } from "@/components/common/text";

export const TopPresentation: React.FC<{}> = ({}) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="mx-auto my-0">
                <KanaText>スペースキーを押下</KanaText>
            </div>
        </div>
    );
};
