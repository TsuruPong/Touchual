"use client";

import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { KeyKind } from "@/components/containers/const/key/kinds";
import { Kanit } from "next/font/google";

const keyStyle = css`
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.25rem;
  border: solid 1px;
  background-color: #6679a3;
  user-select: none;
  border: solid 1px #fff;
  color: #fff;
`;

const font = Kanit({ subsets: ["latin"], weight: "600" });

const keySizeStyles = {
  [KeyKind.STANDARD]: css`
    width: 40px;
    height: 40px;
  `,
  [KeyKind.REGULAR]: css`
    width: 50px;
    height: 40px;
  `,
  [KeyKind.LARGE]: css`
    width: 60px;
    height: 40px;
  `,
  [KeyKind.BIG]: css`
    width: 80px;
    height: 40px;
  `,
  [KeyKind.HUGE]: css`
    width: 100px;
    height: 40px;
  `,
  [KeyKind.SPACE]: css`
    width: 250px;
    height: 40px;
  `,
};

const keyActive = css`
  background-color: #469b96;
`;

type KeyProps = {
  symbol?: string;
  kind: string;
  code: string;
  isPress: boolean;
};

export const Key: React.FC<KeyProps> = ({ symbol, kind, code, isPress }) => {
  return (
    <div
      id={`key-${code}`}
      css={[
        font.style,
        keyStyle,
        keySizeStyles[kind as keyof typeof keySizeStyles],
        isPress && keyActive,
      ]}
    >
      {symbol}
    </div>
  );
};
