import * as actions from './actionTypes';

export const loadExercises = (start = null, end = null) => ({
    type: actions.LOAD_EXERCISES,
    start,
    end,
});

export const exercisesLoaded = (exercises, start, end) => ({
    type: actions.EXERCISES_LOADED,
    exercises,
    start,
    end,
});

export const loadExerciseDetail = (id) => ({
    type: actions.LOAD_EXERCISE_DETAIL,
    id,
});

export const exerciseDetailLoaded = (id, detail) => ({
    type: actions.EXERCISE_DETAIL_LOADED,
    id,
    detail,
});
