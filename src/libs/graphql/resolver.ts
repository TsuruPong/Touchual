import prisma from "../prisma/client"

export const resolvers = {
    Query: {
        getApproxSentence: async(_: any, args: { level: number, difficulty: number }) => {
            const nearIndicators = await prisma.$queryRaw<{ difficulty: number }>`
            SELECT MIN(ABS(difficulty - ${args.difficulty})) AS difficulty
            FROM "SentenceIndicators"
            WHERE level = ${args.level}
            ORDER BY difficulty asc
          `;

            return await prisma.sentences.findMany({
                where: {
                    SentenceIndicators: {
                        level: args.level,
                        difficulty: nearIndicators.difficulty
                    }
                },
                include: {
                    SentenceIndicators: true
                }
            });
        }
    }
}
