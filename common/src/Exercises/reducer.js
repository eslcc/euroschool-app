import * as actions from './actionTypes';

const initialState = {
    exercises: null,
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
            console.dir(action);
            return {
                loading: false,
                exercises: action.exercises,
            };
        default:
            return state;
    }
};
