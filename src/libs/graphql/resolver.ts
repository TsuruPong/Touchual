import prisma from "../prisma/client"

export const resolvers = {
    Query: {
        GetSentence: async() => {
            return await prisma.sentences.findFirst();
        }
    }
}
