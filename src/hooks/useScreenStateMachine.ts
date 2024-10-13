"use client"

import * as React from 'react';
import { IStateMachine } from "@/feature/interfaces/transitions/machine"
import { ScreenStateMachine } from "@/feature/boundaries/transitions/screen/machine"
import { IState } from '@/feature/interfaces/transitions/state';

export const useScreenStateMachine = () => {
    const machine: IStateMachine = React.useMemo(() => ScreenStateMachine.getInstance(), []);
    const [current, setCurrent] = React.useState<IState>(machine.getCurrent())

    const forward = () => {
        machine.forward();
        setCurrent(() => machine.getCurrent())
    }

    const backward = () => {
        machine.backward();
        setCurrent(() => machine.getCurrent())
    }

    return { current, forward, backward };
}