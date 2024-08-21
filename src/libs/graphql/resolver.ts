import prisma from "../prisma/db"

export const resolvers = {
    Query: {
        sentence: () => {
            return prisma.sentences.findFirst();
        }
    }
}
