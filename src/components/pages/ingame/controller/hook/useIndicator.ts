import * as React from "react";

export const useIndicator = () => {
    const calcWpm = React.useCallback((correct: number, time: number): number => {
        return Math.round((correct / 5) / (time / 60) * 100) / 100;
    }, []);

    const calcAcc = React.useCallback((total: number, correct: number): number => {
        return Math.round((correct / total) * 100 * 100) / 100;
    }, []);

    const calcProgress = React.useCallback((
        currentLevel: number, currentDifficulty: number, indicator: { total: number , correct: number, incorrect: number, time: number }
    ): { level: number, difficulty: number } => {
        const wpm: number = calcWpm(indicator.correct, indicator.time);
        const acc: number = calcAcc(indicator.total, indicator.correct);
        const increaseCoef = calcIncreaseCoef(wpm, acc);
        const decreaseCoef = calcDecreaseCoef(indicator.incorrect);
        let level: number = currentLevel;
        let difficulty: number = calcDifficulty(currentDifficulty, increaseCoef, decreaseCoef);
        if (difficulty >= 1.0) {
            level++;
            difficulty = Math.round((difficulty % 1) * 10) / 10;
        }
        
        console.log(`current level:      ${currentLevel}`);
        console.log(`current difficulty: ${currentDifficulty}`);
        console.log(`indicator:          ${JSON.stringify(indicator)}`);
        console.log(`wpm:                ${wpm}`);
        console.log(`acc:                ${acc}`);
        console.log(`inc:                ${increaseCoef}`);
        console.log(`dec:                ${decreaseCoef}`);
        console.log(`next level:         ${level}`);
        console.log(`next difficulty:    ${difficulty}`);
        
        return { level, difficulty };
    }, []);

    const calcDifficulty = (currentDifficulty: number, incCoef: number, decCoef: number): number => {
        const calc = Math.round((currentDifficulty + (incCoef * 0.75) - decCoef) * 100) / 100;
        return Number.isNaN(calc) ? 0 : calc;
    }

    const calcIncreaseCoef = React.useCallback((wpm: number, acc: number): number => {
        return Math.round(((wpm * acc) / 1000) * 100) / 100;
    }, []);

    const calcDecreaseCoef = React.useCallback((incorrect: number): number => {
        const decrease = 0.05;
        return Math.round((incorrect * decrease) * 100) / 100;
    }, [])

    return { calcWpm, calcAcc, calcProgress };
}