"use client";

import * as React from 'react';

export const useKeyboardInput = (
    keydownCallback?: (event: KeyboardEvent) => void,
    keyupCallback?: (event: KeyboardEvent) => void
) => {
    const ignoreKeys: string[] = [
        "Tab",
        "CapsLock",
        "MetaLeft",
        "MetaRight",
        "Alt",
        "Shift",
        "Control",
        "Meta"
    ];

    const handleKeydown = (event: KeyboardEvent) => {
        if (ignoreKeys.includes(event.key)) return;
        if (!keydownCallback) return;
        keydownCallback(event);
    }

    const handleKeyup = (event: KeyboardEvent) => {
        if (ignoreKeys.includes(event.key)) return;
        if (!keyupCallback) return;
        keyupCallback(event)
    }
  
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);
    
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyup);
        };
    }, []);
}
