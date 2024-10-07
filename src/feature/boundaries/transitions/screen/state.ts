import { AbstractState } from "../abs/state";
import { ScreenStateMachine } from "./machine";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IState } from "@/feature/interfaces/transitions/state";
import { AbstractStateMachine } from "../abs/machine";

abstract class AbstractScreenState<TState extends IState, TMachine extends AbstractStateMachine<TState>>extends AbstractState<TState, TMachine> {
    protected router: AppRouterInstance;
    constructor(statemachine: TMachine, router: AppRouterInstance) {
        super(statemachine);
        this.router = router;
    }
}

export class InitScreenState extends AbstractScreenState<InitScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine, rounter: AppRouterInstance) {
        super(statemachine, rounter);
    }
    do(): void {
        this.router.push("/top");
    }
    forward(): void {
        this.statemachine.change(this.statemachine.countdown);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class CountdownScreenState extends AbstractScreenState<CountdownScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine, rounter: AppRouterInstance) {
        super(statemachine, rounter);
    }
    do(): void {
        this.router.push("/countdown")
    }
    forward(): void {
        this.statemachine.change(this.statemachine.ingame);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class IngameScreenState extends AbstractScreenState<IngameScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine, rounter: AppRouterInstance) {
        super(statemachine, rounter);
    }
    do(): void {
        this.router.push("/ingame")
    }
    forward(): void {
        this.statemachine.change(this.statemachine.result);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}

export class ResultScreenState extends AbstractScreenState<ResultScreenState, ScreenStateMachine> {
    constructor(statemachine: ScreenStateMachine, rounter: AppRouterInstance) {
        super(statemachine, rounter);
    }
    do(): void {
        this.router.push("/result")
    }
    forward(): void {
        this.statemachine.change(this.statemachine.init);
    }
    backward(): void {
        this.statemachine.change(this.statemachine.init);
    }
}