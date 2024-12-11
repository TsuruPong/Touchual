"use client";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Kanit } from "next/font/google";
import * as React from "react";
import { LetterKind } from "./type";

const font = Kanit({ subsets: ["latin"], weight: "500" });

type LetterProps = {
    letter: string;
    kind: LetterKind;
};

const Kinds = {
    [LetterKind.EMPTY]: css`
        color: #647488;
    `,
    [LetterKind.COLLECT]: css`
        color: #fff;
    `,
    [LetterKind.INCOLLECT]: css`
        color: #f00;
    `,
};

const style = css`
    font-size: 1.5rem;
    line-height: 2rem;
`;

export const Letter: React.FC<LetterProps> = ({ letter, kind }) => {
    return (
        <label css={[style, font.style, Kinds[kind as keyof typeof Kinds]]}>
            {letter}
        </label>
    );
};
