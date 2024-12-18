"use client";

import * as React from "react";

import { Key } from "./key";
import { KeyConfig, KeyConfigType } from "@/const/key/config";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";

export const VirtualKeyBoard: React.FC = () => {
    const [keysPressed, setKeysPressed] = React.useState<Set<KeyboardEvent>>(
        new Set()
    );
    const handleKeydown = (event: KeyboardEvent) => {
        setKeysPressed(
            (prevKeysPressed) => new Set([...prevKeysPressed, event])
        );
    };
    const handleKeyup = (event: KeyboardEvent) => {
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

    useKeyboardInput(handleKeydown, handleKeyup);

    return (
        <div className="w-[600px] h-[200px]">
            {KeyConfig.map((line, i) => {
                return (
                    <div key={`key-line${i}`} className="flex">
                        {line.map((key: KeyConfigType) => {
                            return (
                                <Key
                                    key={`key-${key.code}`}
                                    symbol={key.symbol}
                                    kind={key.kind}
                                    code={key.code}
                                    isPress={Array.from(keysPressed).some(
                                        (k) => k.code == key.code
                                    )}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
