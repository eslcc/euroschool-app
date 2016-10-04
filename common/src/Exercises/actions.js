import * as actions from './actionTypes';

export const loadExercises = (start = null, end = null) => ({
    type: actions.LOAD_EXERCISES,
    start,
    end,
});

export const exercisesLoaded = (exercises) => ({
    type: actions.EXERCISES_LOADED,
    exercises,
});
