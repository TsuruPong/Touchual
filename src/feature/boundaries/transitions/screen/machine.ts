import { AbstractStateMachine } from "../abs/machine";
import { CountdownScreenState, IngameScreenState, InitScreenState, ResultScreenState } from "./state";

export class ScreenStateMachine extends AbstractStateMachine<InitScreenState | CountdownScreenState | IngameScreenState | ResultScreenState> {
    readonly init: InitScreenState;
    readonly countdown: CountdownScreenState;
    readonly ingame: IngameScreenState;
    readonly result: ResultScreenState;
    constructor() {
        super();
        this.init = new InitScreenState(this); 
        this.countdown = new CountdownScreenState(this);
        this.ingame = new IngameScreenState(this);
        this.result = new ResultScreenState(this);
        this.current = this.init;
    }
}