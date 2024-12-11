import { Mora, tokenize } from "manimani"

export const useTokenizer = () => {
    const convertJaToRomajiTokens = async (sentence: string): Promise<Mora[]> => {
        return await new Promise(resolve => {
            tokenize("/dict", sentence, (moras: Mora[]) => {
                resolve(moras)
            });
        });
    }
    return {convertJaToRomajiTokens};
}