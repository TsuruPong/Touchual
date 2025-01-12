import { Mora, MoraNode, tokenize } from "manimani";
import prisma from "../../../prisma/client"
import { MoraNodeWithStatus, MoraWithStatus } from "@/types/extends/manimani";
import { Sql } from "@prisma/client/runtime/library";

interface result {
    id: number,
    text: string,
    ruby: string,
    level: number,
    difficulty: number
}

export const getTypingThemeResolver = async(args: {id: number, level: number, difficulty: number}) => {
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
        )

        select
            si.id,
            si.text,
            si.ruby
        from
        sentences_indicators si
        where si.level = ${args.level}
        order by abs(difficulty - ${args.difficulty}) asc
    `;
    if (!result || result.length === 0) {
        throw new Error("No typing theme found for the given parameters.");
    }
    const row = result.find(r => r.id != args.id);
    if (!row) {
        throw new Error("No typing theme found for the given parameters.");
    }
    console.log(`query result: ${JSON.stringify(row)}`);
    const moras: Mora[] = await toTokens({ text: row.text, ruby: row.ruby });
    const withStatus: MoraWithStatus[] = toMoraWithStatus(moras);
    return { id: row.id, text: row.text, ruby: row.ruby, moras: JSON.stringify(withStatus) };
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