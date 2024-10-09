"use client";

import * as React from 'react';

type KeyboardInput = {
    inputs: KeyBoard[],
    clear: () => void
}

type KeyBoard = {
    code: string,
    key: string
}

export const useKeyboardInput = (): KeyboardInput => {
    const [keysPressed, setKeysPressed] = React.useState<Set<KeyBoard>>(new Set());
    const ignoreKeys: string[] = [
        "Tab",
        "CapsLock",
        "MetaLeft",
        "MetaRight",
        "Alt",
        "AltLeft",
        "AltRight",
        "Shift",
        "ShiftLeft",
        "ShiftRight",
        "ControlLeft",
        "ControlRight",
        "Meta"
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
        if (ignoreKeys.includes(event.key)) return;
        setKeysPressed((prevKeysPressed) => new Set([...prevKeysPressed, ({code: event.code, key: event.key} as KeyBoard)]));
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
        if (ignoreKeys.includes(event.code)) return;
        setKeysPressed((prevKeysPressed) => {
            const newKeysPressed = new Set(prevKeysPressed);
            for (const k of newKeysPressed) {
                if (k.code == event.code) {
                    newKeysPressed.delete(k);
                }
            }
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
        setKeysPressed(() => new Set<KeyBoard>());
    }
    
    return {inputs: Array.from(keysPressed), clear: clear};
}
