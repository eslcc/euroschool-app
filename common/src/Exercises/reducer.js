import * as actions from './actionTypes';

const initialState = {
    exercises: null,
    exerciseDetails: {},
    loading: false,
};

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
                exercises: action.exercises,
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
