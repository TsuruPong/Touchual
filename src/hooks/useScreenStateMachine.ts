"use client"

import * as React from 'react';
import { IStateMachine } from "@/feature/interfaces/transitions/machine"
import { ScreenStateMachine } from "@/feature/boundaries/transitions/screen/machine"
import { IState } from '@/feature/interfaces/transitions/state';
import { useRouter } from 'next/navigation';

export const useScreenStateMachine = () => {
    const machine: IStateMachine = React.useMemo(() => ScreenStateMachine.getInstance(), []);
    const [current, setCurrent] = React.useState<IState>(machine.getCurrent())
    const router = useRouter();

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