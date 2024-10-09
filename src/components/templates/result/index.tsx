"use client";
import { Noto_Sans_Javanese } from "next/font/google";
const font = Noto_Sans_Javanese({ subsets: ["latin"], weight: "500" });
import {
    ScreenStateKinds,
    ScreenStateMachine,
} from "@/feature/boundaries/transitions/screen/machine";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useRouter } from "next/navigation";
import * as React from "react";

export const Result: React.FC = () => {
    const wpm = 60.9;
    const acc = 100;
    const collect = 999;
    const incollect = 999;
    const miss = 999;
    const time = 60;
    const { inputs } = useKeyboardInput();
    const router = useRouter();
    const machine = new ScreenStateMachine(ScreenStateKinds.RESULT, router);
    React.useEffect(() => {
        if (inputs.some((k) => k.code == "Space")) {
            machine.forward();
        }
        if (inputs.some((k) => k.code == "Escape")) {
            machine.backward();
        }
    }, [inputs]);

    return (
        <div className="w-full h-full px-96 py-4">
            <div className="w-full h-full">
                <div className="h-full flex flex-col justify-end">
                    <div className="w-full h-4/5 flex flex-col justify-end">
                        <div className="grid grid-cols-2">
                            <div className="h-full grid grid-rows-2">
                                <div className="w-full h-full text-6xl flex justify-center items-center">
                                    {`WPM : ${wpm}`}
                                </div>
                                <div className="w-full h-full text-6xl flex justify-center items-center">
                                    {`ACC : ${acc}%`}
                                </div>
                            </div>
                            <div className="h-full grid grid-rows-2">
                                <div />
                                <div className="h-full grid grid-cols-2">
                                    <div className="h-full grid grid-rows-2">
                                        <div className="text-3xl">
                                            character
                                        </div>
                                        <div className="text-3xl">{`${collect}/${incollect}/${miss}`}</div>
                                    </div>
                                    <div className="h-full grid grid-rows-2">
                                        <div className="text-3xl">time</div>
                                        <div className="text-3xl">{`${time}sec`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-1/5 flex justify-center items-end">
                        <div className={`${font.className} text-white`}>
                            スペースキーでリスタート
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
