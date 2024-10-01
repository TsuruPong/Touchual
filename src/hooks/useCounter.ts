import * as React from 'react';

export const useCounter = () => {
    const [count, setCount] = React.useState<number>(0);

    const increment = (): void => {
        setCount(prev => prev + 1);
    }

    const decrement = (): void => {
        if (count <= 0) {
            return;
        }
        setCount(prev => prev - 1);
    }

    const reset = (): void => {
        setCount(() => 0);
    }

    return {count, increment, decrement, reset}
}