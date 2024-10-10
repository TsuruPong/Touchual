"use client"

import * as React from 'react';
import { IState } from '@/feature/interfaces/transitions/state';
import { IStateMachine } from "@/feature/interfaces/transitions/machine"
import { ScreenStateMachine } from "@/feature/boundaries/transitions/screen/machine"
import { CountdownScreenState, IngameScreenState, InitScreenState, ResultScreenState } from '@/feature/boundaries/transitions/screen/state';
import { Top } from '@/components/templates/top';
import { CountDown } from '@/components/templates/countdown';
import { Game } from '@/components/templates/ingame';
import { Result } from '@/components/templates/result';

type t = React.FC<{forward: () => void, backward: () => void}>;

export const useScreenStateMachine = () => {
    const machine: IStateMachine = new ScreenStateMachine();
    const [Current, setCurrent] = React.useState<t>(Top);
    const forward = () => {
        machine.forward();
        setCurrent(() => decide(machine.getCurrent()))
    }
    const backward = () => {
        machine.backward();
        setCurrent(() => decide(machine.getCurrent()))
    }
    const decide = (current: IState): t => {
        if (current instanceof InitScreenState) {
            return Top;
        }
        if (current instanceof CountdownScreenState) {
            return CountDown
        }
        if (current instanceof IngameScreenState) {
            return Game;
        }
        if (current instanceof ResultScreenState) {
            return Result;
        } 
        throw new Error(`unknown screen state`)
    }

    return {Current, forward, backward}
}