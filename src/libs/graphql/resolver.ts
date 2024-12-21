import prisma from "../prisma/client"

interface result {
    text: string,
    ruby: string,
    level: number,
    difficulty: number
}
export const resolvers = {
    Query: {
        getApproxSentence: async(_: any, args: { id: number, level: number, difficulty: number }) => {
            const idCondition = args.id ? `where id = ${args.id}` : "";
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
                            ${idCondition}
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
            const { text, ruby, level, difficulty } = result[0];
            return {text, ruby, level, difficulty };
       }
    }
}
