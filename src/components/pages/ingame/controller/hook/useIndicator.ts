import * as React from "react";

export const useIndicator = (
    total: number,
    correct: number,
    incorrect: number,
    time: number
) => {
    const wpm = React.useCallback(() => {
        return (total / 5) / (time / 60);
    }, []);

    const acc = React.useCallback(() => {
        return (correct / total) * 100;
    }, []);

    const calcProgress = (currentLevel: number, currentDifficulty: number): { level: number, difficulty: number } => {
        let level: number = currentLevel;
        let difficulty: number = calcDifficulty(currentDifficulty);
    
        if (difficulty >= 1.0) {
            level += Math.floor(difficulty);
            difficulty = difficulty % 1.0;
        }

        return { level, difficulty };
    }

    const calcDifficulty = (currentDifficulty: number): number => {
        const growCoef = (wpm() * acc()) / 1000;
        const decrease = 0.05;
        const missCoef = incorrect * decrease;
        return currentDifficulty + (growCoef * 0.1) - missCoef
    }

    return { wpm, acc, calcProgress };
}