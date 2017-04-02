import {
    STARTUP_COMPLETED,
    LOGIN_NEEDED,
} from './actionTypes';

const initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_NEEDED:
            return {
                ...state,
            };

        case STARTUP_COMPLETED:
            return {
                ...state,
            };

        default:
            return state;
    }
};
