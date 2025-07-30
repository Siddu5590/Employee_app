import { Excercise } from './excercise.module';
import { SET_AVAILABLE_TRAINING, SET_FINISHED_TRAINING, START_TRAINING, STOP_TRAINING, TrainingActions } from './training.actions';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    availableExcercises: Excercise[];
    finishedExcercises: Excercise[];
    activeTraining: Excercise | null;
};

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState = {
    availableExcercises: [],
    finishedExcercises: [],
    activeTraining: null
};

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions) {

    switch (action.type) {
        case SET_AVAILABLE_TRAINING:
            return {
                ...state,
                availableExcercises: action.payload
            };
        case SET_FINISHED_TRAINING:
            return {
                ...state,
                finishedExcercises: action.payload
            };
        case START_TRAINING:
            const foundExercise = state.availableExcercises.find(exc => exc.id === action.payload);
            return {
                ...state,
                activeTraining: foundExercise ? { ...foundExercise } : null
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

 export const getAvailableExcercises = createSelector(getTrainingState, (state:TrainingState) => state.availableExcercises);
 export const getFinishedExcercises =  createSelector(getTrainingState, (state: TrainingState) => state.finishedExcercises);
 export const getActiveTraining =  createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);

 export const getIsTraining =  createSelector(getTrainingState, (state: TrainingState) => state.activeTraining !=null);