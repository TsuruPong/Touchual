import { IState } from "./state";

export interface IStateMachine {
    change(state: IState): void;
    forward(): void;
    backward(): void;
    getCurrent(): IState;
}