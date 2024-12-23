export const useQueue = <T>(capacity: number) => {
    if (capacity <= 0) {
        throw new Error("Capacity must be greater than 0");
    }

    const queue: (T | undefined)[] = Array.from({ length: capacity });
    let head = 0;
    let tail = 0;
    let size = 0;

    const isFull = () => size === capacity;
    const isEmpty = () => size === 0;

    const push = (element: T) => {
        if (isFull()) {
            throw new Error("Queue is full");
        }
        queue[tail] = element;
        tail = (tail + 1) % capacity;
        size++;
    };

    const pop = (): T | undefined => {
        if (isEmpty()) {
            throw new Error("Queue is empty");
        }
        const element = queue[head];
        queue[head] = undefined;
        head = (head + 1) % capacity;
        size--;
        return element;
    };

    return { push, pop, isFull, isEmpty };
};
