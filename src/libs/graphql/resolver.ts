import prisma from "../prisma/client"

interface result {
    text: string,
    ruby: string,
    level: number,
    difficulty: number
}
export const resolvers = {
    Query: {
        getApproxSentence: async(_: any, args: { level: number, difficulty: number }) => {
            const result = await prisma.$queryRaw<result[]>`
                select
                *
                from
                "SentenceIndicators"
                where
                abs(difficulty - ${args.difficulty}) = (
                    select
                    min(abs(difficulty - ${args.difficulty})) as d
                    from
                    "SentenceIndicators"
                )
                and level = ${args.level}
            `;
            const { text, ruby, level, difficulty } = result[0];
            return {text, ruby, level, difficulty };
       }
    }
}
