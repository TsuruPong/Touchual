import { IState } from "@/feature/interfaces/transitions/state";
import { AbstractStateMachine } from "./machine";

export abstract class AbstractState<TState extends IState, TMachine extends AbstractStateMachine<TState>> implements IState{
    readonly statemachine: TMachine;
    constructor(stateMachine: TMachine) {
        this.statemachine = stateMachine;
    }
    abstract do(): void;
    abstract forward(): void;
    abstract backward(): void;
}