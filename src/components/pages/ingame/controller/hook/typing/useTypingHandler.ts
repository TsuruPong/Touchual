import * as React from 'react';
import { useTypingThemeStore } from '../useTypingThemeStore';
import { MoraWithStatus } from '@/types/extends/manimani';
import { useTypingCounter } from './useTypingCounter';
import { useTypingValidator } from './useTypingValidator';
import { useMoraUpdater } from '../mora/useMoraUpdater';

export const useTypingHandler = () => {
    const moras = useTypingThemeStore((state) => state.moras);
    const updateMoras = useTypingThemeStore(
        (state) => state.updateMoras
    );
    const moraRef = React.useRef(moras);
    React.useEffect(() => {
        moraRef.current = moras;
    }, [moras]);

    const { general, present } = useTypingCounter();
    const { isTypingCorrect } = useTypingValidator();
    const { updateCorrect, updateIncorrect } = useMoraUpdater();

    const handleTyping = React.useCallback((event: KeyboardEvent) => {
        event.preventDefault();
        const target = moraRef.current;
        if (target.length == 0) return;
        let m: MoraWithStatus[] = [...target];
        if (m.length == 0) return;
        general.total.increment();
        if (isTypingCorrect(m, event.key)) {
            general.correct.increment();
            present.correct.increment();
            m = updateCorrect(m, event.key);
        } else {
            general.incorrect.increment();
            present.incorrect.increment();
            m = updateIncorrect(m);
        }
        updateMoras(m);
    }, []);

    return { handleTyping };
}