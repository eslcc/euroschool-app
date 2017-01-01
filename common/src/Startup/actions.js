import * as actions from './actionTypes';

export const checkLogin = () => ({
    type: actions.CHECK_LOGIN,
});

export const startupCompleted = () => ({
    type: actions.STARTUP_COMPLETED,
});

export const loginNeeded = () => ({
    type: actions.LOGIN_NEEDED,
});
