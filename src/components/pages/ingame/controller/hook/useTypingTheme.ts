import { useGetTypingThemeLazyQuery } from '@/libs/graphql/generated';
import { MoraWithStatus } from '@/types/extends/manimani';

type TypingTheme = {
    id: number;
    text: string;
    ruby: string;
    moras: MoraWithStatus[];
}

export const useTypingTheme = () => {
    const [getTypingTheme, { loading, error}] = useGetTypingThemeLazyQuery();
    const fetchTypingTheme = async(level: number, difficulty: number, id?: number): Promise<TypingTheme> => {
        const response = await getTypingTheme({ variables: {id, level, difficulty} });
        if (error) {
            throw new Error(`Error fetching typing theme: ${error.message}`);
        }
        const fetchedId = response.data?.getTypingTheme?.id ?? 0;
        const fetchedText = response.data?.getTypingTheme?.text ?? "";
        const fetchedRuby = response.data?.getTypingTheme?.ruby ?? "";
        const fetchedMoras = response.data?.getTypingTheme?.moras ?? "";
        const moras = JSON.parse(fetchedMoras) as MoraWithStatus[];
        return { id: fetchedId, text: fetchedText, ruby: fetchedRuby, moras };
    }

    return { fetchTypingTheme, loading, error }
}