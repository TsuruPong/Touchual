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

    const levelAndDifficulty = (): { level: number, difficulty: number } => {
        let level = 1;
        let difficulty = 0.0;
        const correctRate = correct / total;
        const incorrectRate = incorrect / total;
        const speedBonus = Math.max(0, (wpm() - 40) / 20); 
        const accuracyBonus = acc() / 100; 
        const difficultyIncrease = 0.5 + (speedBonus * 0.3) + (accuracyBonus * 0.2); 

        const penalty = incorrectRate * 0.1; 
        const slowPenalty = Math.max(0, (30 - wpm()) / 30); 
        const difficultyDecrease = penalty + (slowPenalty * 0.5); 

        difficulty += difficultyIncrease - difficultyDecrease; 
        difficulty = Math.min(0.9, Math.max(0.0, difficulty));

        if (difficulty >= 1.0) {
            difficulty -= 1.0;
            level = Math.min(level + 1, 10);
        }

        return { level, difficulty };
    }

    return { wpm, acc, levelAndDifficulty };
}