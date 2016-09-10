import {
    STARTUP_COMPLETED,
    APP_LOADED,
    LOGIN_NEEDED,
} from '../ActionTypes';

const initialState = {
    scene: {},
};

const startupReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case APP_LOADED:
        return {
            ...state,
            scene: '',
        };

    case LOGIN_NEEDED:
        return state;

    case STARTUP_COMPLETED:
        return state;

    default:
        return state;
    }
};
