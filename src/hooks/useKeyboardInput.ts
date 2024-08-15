"use client";

import * as React from 'react';

type KeyboardInput = {
    inputs: string[],
    clear: () => void
}

export const useKeyboardInput = (): KeyboardInput => {
    const [keysPressed, setKeysPressed] = React.useState<Set<string>>(new Set());
    const ignoreKeys: string[] = [
        "Tab",
        "Caps",
        "MetaLeft",
        "MetaRight",
        "Alt",
        "Shift",
        "Control",
        "Meta"
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
        if (ignoreKeys.includes(event.key)) return;
        setKeysPressed((prevKeysPressed) => new Set([...prevKeysPressed, event.key]));
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
        if (ignoreKeys.includes(event.key)) return;
        setKeysPressed((prevKeysPressed) => {
            const newKeysPressed = new Set(prevKeysPressed);
            newKeysPressed.delete(event.key);
            return newKeysPressed;
        });
    };
  
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const clear = () => {
        setKeysPressed(() => new Set<string>());
    }
    
    return {inputs: Array.from(keysPressed), clear: clear};
}
