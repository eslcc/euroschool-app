import { Actions } from 'react-native-router-flux';

import {
    STARTUP_COMPLETED,
    APP_LOADED,
    LOGIN_NEEDED,
} from '../ActionTypes';

const initialState = {
    scene: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case APP_LOADED:
        return state;

    case LOGIN_NEEDED:
        Actions.login();
        return state;

    case STARTUP_COMPLETED:
        Actions.home();
        return state;

    default:
        return state;
    }
};
