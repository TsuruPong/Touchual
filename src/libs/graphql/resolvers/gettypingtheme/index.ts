import { Mora, MoraNode, tokenize } from "manimani";
import prisma from "../../../prisma/client"
import { MoraNodeWithStatus, MoraWithStatus } from "@/types/extends/manimani";

interface result {
    id: number,
    text: string,
    ruby: string,
    level: number,
    difficulty: number
}

export const getTypingThemeResolver = async(args: {id: number, level: number, difficulty: number}) => {
    const idCondition = args.id ? `id = ${args.id}` : "1=1";
    const result = await prisma.$queryRaw<result[]>`
        with sentences_indicators as (
            select
                sentence.id,
                sentence.text,
                sentence.ruby,
                indicator.level,
                indicator.difficulty
            from
            "Sentences" as sentence
            inner join "SentenceIndicators" as indicator
            on sentence.text = indicator.text
            and sentence.ruby = indicator.ruby
        ),
        approx_id as (
            select
                id
            from
            sentences_indicators
            where
                difficulty = (
                    select
                        difficulty
                    from
                    sentences_indicators
                    where
                    ($1::int IS NULL OR id = $1)
                    order by abs(difficulty - ${args.difficulty}) asc
                    limit 1
                )
                and level = 1
        )

        select
            si.id,
            si.text,
            si.ruby
        from
        sentences_indicators si
        inner join approx_id ai
        on si.id = ai.id
    `;
    const { id, text, ruby } = result[0];
    const moras: Mora[] = await toTokens({ text, ruby });
    const withStatus: MoraWithStatus[] = toMoraWithStatus(moras);
    return { id, text, ruby, moras: JSON.stringify(withStatus) };
}

const toTokens = async(sentence: { text: string, ruby: string }): Promise<Mora[]> => {
    return await new Promise(resolve => {
        const dictionaryDir = process.env.DICTIONARY_DIR;
        if (!dictionaryDir) {
            throw new Error("DICTIONARY_DIR environment variable is not set.");
        }
        tokenize(dictionaryDir, sentence.ruby, (moras: Mora[]) => {
            resolve(moras);
        })
    });
};

const toMoraWithStatus = (moras: Mora[]): MoraWithStatus[] => {
    return moras.map((mora) => ({
        ...mora,
        status: "unanswered",
        node: toMoraNodeWithStatus(mora.node)
    }));
};
const toMoraNodeWithStatus = (nodes: MoraNode[]): MoraNodeWithStatus[] => {
    return nodes.map((node) => ({
        ...node,
        status: "unanswered",
        children: toMoraNodeWithStatus(node.children)
    }));
};