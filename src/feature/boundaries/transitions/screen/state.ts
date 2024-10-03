import { AbstractState } from "../abs/state";
import { ScreenStateMachine } from "./machine";

export class InitScreenState extends AbstractState<InitScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
        throw new Error("Method not implemented.");
    }
    forward(): void {
        this.statemachine.change(this.statemachine.countdown);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class CountdownScreenState extends AbstractState<CountdownScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
        throw new Error("Method not implemented.");
    }
    forward(): void {
        this.statemachine.change(this.statemachine.ingame);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class IngameScreenState extends AbstractState<IngameScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
        throw new Error("Method not implemented.");
    }
    forward(): void {
        this.statemachine.change(this.statemachine.result);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class ResultScreenState extends AbstractState<ResultScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine) {
        super(statemachine);
    }
    do(): void {
        throw new Error("Method not implemented.");
    }
    forward(): void {
        this.statemachine.change(this.statemachine.init);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}