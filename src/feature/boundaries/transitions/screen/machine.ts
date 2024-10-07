import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AbstractStateMachine } from "../abs/machine";
import { CountdownScreenState, IngameScreenState, InitScreenState, ResultScreenState } from "./state";

export const ScreenStateKinds = {
    INIT: "INIT",
    COUNTDOWN: "COUNTDOWN",
    INGAME: "INGAME",
    RESULT: "RESULT"
}  as const;

export type ScreenStateKind = typeof ScreenStateKinds[keyof typeof ScreenStateKinds];

export class ScreenStateMachine extends AbstractStateMachine<InitScreenState | CountdownScreenState | IngameScreenState | ResultScreenState> {
    readonly init: InitScreenState;
    readonly countdown: CountdownScreenState;
    readonly ingame: IngameScreenState;
    readonly result: ResultScreenState;
    constructor(kind: ScreenStateKind, router: AppRouterInstance) {
        super();
        this.init = new InitScreenState(this, router); 
        this.countdown = new CountdownScreenState(this, router);
        this.ingame = new IngameScreenState(this, router);
        this.result = new ResultScreenState(this, router);

        if (kind == ScreenStateKinds.INIT) {
            this.current = this.init;
        } else if(kind == ScreenStateKinds.COUNTDOWN) {
            this.current = this.countdown;
        } else if(kind == ScreenStateKinds.INGAME) {
            this.current = this.ingame;
        } else {
            this.current = this.result;
        }
    }
}