import * as actions from './actionTypes';

export const loginFailed = () => ({
    type: actions.LOGIN_FAILED,
});

export const loginAttempt = (email, password) => ({
    type: actions.LOGIN_ATTEMPT,
    email,
    password,
});

export const loginSuccess = () => ({
    type: actions.LOGIN_SUCCESS,
});
