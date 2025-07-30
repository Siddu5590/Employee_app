import { Action } from "@ngrx/store";
import { Excercise } from "./excercise.module";

export const SET_AVAILABLE_TRAINING = '[Training] Set Available Training';
export const SET_FINISHED_TRAINING = '[Training] Set Finished Training';

export const START_TRAINING = '[Training] Set Start Training';
export const STOP_TRAINING = '[Training] Set Stop Training';



export class SetAvailableTraining implements Action {
    readonly type = SET_AVAILABLE_TRAINING;

    constructor(public payload:Excercise[]){}
}

export class SetFinishedExcercises implements Action {
    readonly type = SET_FINISHED_TRAINING;

        constructor(public payload:Excercise[]){}
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;

        constructor(public payload:string){}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}


export type TrainingActions = SetAvailableTraining | SetFinishedExcercises | StartTraining | StopTraining;