import * as actions from './actionTypes';

const initialState = {
    exercises: [],
    exerciseDetails: {},
    loading: false,
    loadedStart: null,
    loadedEnd: null,
};

function mergeArrays(base, top) {
    if (base.length === 0) {
        return top;
    }
    const result = base.slice(0);
    top.forEach((item) => {
        const includes = base.reduce((prev, val) => prev || item.id === val.id, false);
        if (!includes) {
            result.push(item);
        }
    });
    return result;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.LOAD_EXERCISES:
            return {
                ...state,
                loading: true,
            };
        case actions.EXERCISES_LOADED:
            return {
                ...state,
                loading: false,
                exercises: mergeArrays(state.exercises, action.exercises),
                loadedStart: action.start,
                loadedEnd: action.end,
            };
        case actions.EXERCISE_DETAIL_LOADED:
            return {
                ...state,
                exerciseDetails: {
                    ...state.exerciseDetails,
                    [action.id]: action.detail,
                },
            };
        default:
            return state;
    }
};
