"use client";

import * as React from "react";
import { useGetApproxSentenceQuery } from "@/libs/graphql/generated";
import { InGame } from "@/components/templates/ingame";

export const InGameContainer: React.FC = () => {
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

    if (!sentence) {
        return <>loading...</>;
    }

    return (
        <InGame
            sentence={sentence}
            handleRefetch={(level: number, difficulty: number) =>
                refetch({
                    level: level,
                    difficulty: difficulty,
                })
            }
        />
    );
};
