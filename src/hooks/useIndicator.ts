"use client"

export const useIndicator = () => {

    const wpm = (count: number): number => {
        return (count) / (5 * (60 / 60));
    }

    const acc = (collectCount: number, totalCount: number) => {
        return (collectCount / totalCount) * 100;
    }

    return {wpm, acc};
}