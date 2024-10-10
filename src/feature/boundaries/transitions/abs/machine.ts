import { IStateMachine } from "@/feature/interfaces/transitions/machine";
import { IState } from "@/feature/interfaces/transitions/state";

export abstract class AbstractStateMachine<TState extends IState> implements IStateMachine {
    protected current: TState;
    constructor(init: TState) {
        this.current = init;
    }
    change(state: TState): void {
        this.current = state;
        this.current.do();
    }
    forward(): void {
        if (!this.current) throw new Error(``);
        this.current.forward();
    }
    backward(): void {
        if (!this.current) throw new Error(``);
        this.current.backward();
    }
    getCurrent(): TState {
        return this.current;
    }
}