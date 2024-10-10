import { AbstractState } from "../abs/state";
import { ScreenStateMachine } from "./machine";
import { IState } from "@/feature/interfaces/transitions/state";
import { AbstractStateMachine } from "../abs/machine";

abstract class AbstractScreenState<TState extends IState, TMachine extends AbstractStateMachine<TState>>extends AbstractState<TState, TMachine> {
    constructor(statemachine: TMachine) {
        super(statemachine);
    }
}

export class InitScreenState extends AbstractScreenState<InitScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
    }
    forward(): void {
        this.statemachine.change(this.statemachine.countdown);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class CountdownScreenState extends AbstractScreenState<CountdownScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
    }
    forward(): void {
        this.statemachine.change(this.statemachine.ingame);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class IngameScreenState extends AbstractScreenState<IngameScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
    }
    forward(): void {
        this.statemachine.change(this.statemachine.result);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class ResultScreenState extends AbstractScreenState<ResultScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
    }
    forward(): void {
        this.statemachine.change(this.statemachine.init);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}