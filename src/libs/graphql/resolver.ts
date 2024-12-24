import { getTypingThemeResolver } from "./resolvers/gettypingtheme"

export const resolvers = {
    Query: {
        getTypingTheme: async(_: any, args: { id: number, level: number, difficulty: number }) => {
            return getTypingThemeResolver(args);
       }
    }
}

