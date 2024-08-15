export type KanaSymbol = {
    shiins: string[],
    boin: string,
    origin?: KanaSymbol,
    kogaki?: KanaSymbol,
};
