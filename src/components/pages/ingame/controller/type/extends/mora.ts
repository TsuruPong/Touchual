import { Mora, MoraNode } from "manimani";

type Status = "correct" | "incorrect" | "unanswered";

export type MoraWithStatus =  Mora &{
    status: Status;
}

export type MoraNodeWithStatus =  MoraNode & {
    status: Status;
}
