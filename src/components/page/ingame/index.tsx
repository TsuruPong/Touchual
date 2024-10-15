"use client";

import * as React from "react";
import { useGetApproxSentenceQuery } from "@/libs/graphql/generated";
import { InGame } from "@/components/templates/ingame";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";

export const InGameContainer: React.FC<{
    forward: () => void;
    backward: () => void;
}> = ({ forward, backward }) => {
    const [sentence, setSentence] = React.useState<{
        text: string;
        ruby: string;
    }>();
    const { data, error, loading, refetch } = useGetApproxSentenceQuery({
        variables: { level: 1, difficulty: 1.0 },
    });
    React.useEffect(() => {
        const sentence = data?.getApproxSentence || undefined;
        if (!sentence?.text || !sentence?.ruby) return;
        setSentence(() => ({
            text: sentence.text,
            ruby: sentence.ruby,
        }));
    }, [loading, data]);
    const { inputs, clear } = useKeyboardInput();

    React.useEffect(() => {
        if (inputs.some((k) => k.code == "Escape")) {
            backward();
        }
    }, [inputs]);

    return (
        sentence && (
            <InGame
                sentence={sentence}
                handleTimeup={forward}
                handleRefetch={(level: number, difficulty: number) =>
                    refetch({
                        level: level,
                        difficulty: difficulty,
                    })
                }
            />
        )
    );
};
