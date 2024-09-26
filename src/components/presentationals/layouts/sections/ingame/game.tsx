"use client";

import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suggestion } from "./suggestion";
import { InGameTimer } from "./timer";
import { Noto_Sans_Javanese } from "next/font/google";
import { useGetApproxSentenceQuery } from "@/libs/graphql/generated";
const font = Noto_Sans_Javanese({ subsets: ["latin"], weight: "500" });

type Sentence = {
    text: string;
    ruby: string;
};

export const Game = React.memo(() => {
    const [sentence, setSentence] = React.useState<Sentence>();
    const [level, setLevel] = React.useState<number>(1);
    const [difficulty, setDifficulty] = React.useState<number>(1.0);
    const { data, error, loading, refetch } = useGetApproxSentenceQuery({
        variables: { level: level, difficulty: difficulty },
    });

    const handleCompleteNotice = () => {
        fetchSentence();
    };

    const handleTimeupNotice = () => {
        navigateToResult();
    };

    const fetchSentence = refetch;

    React.useEffect(() => {
        const sentence = data?.getApproxSentence || undefined;
        setSentence(() => sentence);
    }, [loading]);

    React.useEffect(() => {
        //if (!error) console.error(error);
    }, [error]);

    React.useEffect(() => {
        fetchSentence();
    }, []);

    const navigateToResult = () => {};

    return (
        <div className="h-full grid grid-rows-[0.1fr,1fr,0.1fr] grid-flow-row gap-7">
            <div />
            <div className="flex justify-center items-center">
                <div className="w-fit flex flex-col">
                    <div className="select-none text text-2xl w-full h-[40px] flex items-center">
                        <InGameTimer callback={handleTimeupNotice} />
                    </div>
                    <div className="select-none text text-2xl w-full flex items-center">
                        <div className={`${font.className} text-white`}>
                            {sentence && sentence.text}
                        </div>
                    </div>
                    <div className="select-none text text-2xl w-full flex items-center">
                        <div className={`${font.className} text-white`}>
                            {sentence && sentence.ruby}
                        </div>
                    </div>
                    <div className="select-none text text-2xl w-full h-[70px] flex items-center">
                        {sentence?.ruby && (
                            <Suggestion
                                sentence={sentence.ruby}
                                callback={handleCompleteNotice}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div />
        </div>
    );
});
