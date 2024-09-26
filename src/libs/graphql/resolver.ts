import { Prisma } from "@prisma/client"
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
                    SELECT
                    text,
                    ruby
                    FROM
                    "SentenceIndicators"
                    WHERE
                    level = ${args.level}
                    AND
                    difficulty = ${args.difficulty}
                    LIMIT 1
                `;
            const { text, ruby, level, difficulty } = result[0];
            return {text, ruby, level, difficulty };
       }
    }
}
