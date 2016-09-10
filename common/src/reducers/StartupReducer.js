import {
    STARTUP_COMPLETED,
    LOGIN_NEEDED,
} from '../ActionTypes';

const initialState = {
    scene: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_NEEDED:
            return {
                ...state,
                scene: 'login',
            };

        case STARTUP_COMPLETED:
            return {
                ...state,
                scene: 'home',
            };

        default:
            return state;
    }
};
