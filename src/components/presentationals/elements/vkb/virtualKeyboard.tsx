"use client";

import * as React from "react";
import { Key } from "../key/key";
import {
  KeyConfig,
  KeyConfigType,
} from "@/components/containers/const/key/config";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";

export const VirtualKeyBoard: React.FC = () => {
  const { inputs } = useKeyboardInput();

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
                  isPress={inputs.includes(key.symbol.toLocaleLowerCase())}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
