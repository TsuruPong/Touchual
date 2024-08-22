import prisma from "../prisma/db"

export const resolvers = {
    Query: {
        GetSentence: async() => {
            return await prisma.sentences.findFirst();
        }
    }
}
