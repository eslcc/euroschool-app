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
        default:
            return state;
    }
};
