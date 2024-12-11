"use client";

import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { InGameTimer } from "./timer";
import { EngText, KanaText } from "@/components/common/text";
import { AutoCompleate as AutoCompleateType } from "./autocompleate/type";
import { AutoCompleate } from "./autocompleate";

export const InGamePresentation: React.FC<{
    sentence: { text: string; ruby: string };
    autocompleates: AutoCompleateType[];
    handleTimeup: () => void;
    handleRefetch: (level: number, difficulty: number) => void;
}> = ({ sentence, autocompleates, handleTimeup, handleRefetch }) => {
    return (
        <div className="h-full grid grid-rows-[0.1fr,1fr,0.1fr] grid-flow-row gap-7">
            <div />
            <div className="flex justify-center items-center">
                <div className="w-fit flex flex-col">
                    <div className="select-none text text-2xl w-full h-[40px] flex items-center">
                        <InGameTimer callback={handleTimeup} />
                    </div>
                    <div className="select-none text text-2xl w-full flex items-center">
                        <EngText>{sentence.text}</EngText>
                    </div>
                    <div className="select-none text text-2xl w-full flex items-center">
                        <KanaText>{sentence.ruby}</KanaText>
                    </div>
                    <div className="select-none text text-2xl w-full h-[70px] flex items-center">
                        <AutoCompleate autocompleates={autocompleates} />
                    </div>
                </div>
            </div>
            <div />
        </div>
    );
};
