import { Actions } from 'react-native-router-flux';

import * as msmLogin from '../lib/msm/login';
import * as moneweb from '../lib/moneweb';
import getSchedule from '../lib/msm/schedule';

import * as actions from './ActionTypes';


export const startupCompleted = () => ({
    type: actions.STARTUP_COMPLETED,
});

export const loginNeeded = () => ({
    type: actions.LOGIN_NEEDED,
});

export const loginFailed = () => ({
    type: actions.LOGIN_FAILED,
});

export const loginAttempt = () => ({
    type: actions.LOGIN_ATTEMPT,
});

export const loginSuccess = (email, password) => ({
    type: actions.LOGIN_SUCCESS,
    email,
    password,
});

export const loadingBalance = () => ({
    type: actions.LOADING_BALANCE
});

export const balanceLoaded = (balance) => ({
    type: actions.BALANCE_LOADED,
    balance,
});

export const balanceLoadFailed = () => ({
    type: actions.BALANCE_LOAD_FAILED,
})

export const settingChanged = (key, value) => ({
    type: actions.SETTING_CHANGED,
    key,
    value,
});

export const doLogin = (email: string, password: string) => (dispatch: func) => {
    dispatch(loginAttempt());
    msmLogin.login(email, password)
        .then((status: boolean) => {
            if (status) {
                dispatch(loginSuccess(email, password));
                Actions.main();
            } else {
                dispatch(loginFailed());
            }
        }).done(); // TODO catch
};

export const loadApp = () =>
    (dispatch, getState) =>
        msmLogin.getLoginStatus().then(
            (status) => {
                if (status) {
                    Actions.main();
                } else {
                    // If login fails (session expiration), the email and password may still be persisted.
                    // In this case, attempt login with persisted credentials.
                    const { login } = getState();
                    const { email, password, failed } = login;
                    if (email !== '' && password !== '' && !failed) {
                        msmLogin.login(email, password).then(loginStatus => {
                            if (loginStatus) {
                                Actions.main();
                            } else {
                                dispatch(loginFailed());
                                Actions.login();
                            }
                        });
                    } else {
                        Actions.login();
                    }
                }
            }
        ).done();

export const scheduleLoaded = (schedule) => ({
    type: actions.SCHEDULE_LOADED,
    schedule,
});

export function loadSchedule(start, end, shouldDispatchInitial = true) {
    return (dispatch) => {
        if (shouldDispatchInitial) {
            dispatch({ type: actions.LOAD_SCHEDULE });
        }
        return getSchedule(start, end).then(
          schedule => dispatch(scheduleLoaded(schedule))
        ).done();
    };
}

export function refreshScheduleInBackgroundIfNeeded(start, end) {
    return (dispatch, getState) => {
        const { schedule } = getState();
        if ((new Date().valueOf() - schedule.lastUpdate) > 86400000) { // last updated more than a day ago
            dispatch(loadSchedule(start, end, false));
        }
    };
}

export function getBalance() {
    return (dispatch, getState) => {
        const { username, password } = getState().settings.moneweb;
        dispatch(loadingBalance());
        return moneweb.login(username, password)
            .then(status => {
                // if (status) {
                    moneweb.getBalance()
                        .then(
                            balance => dispatch(balanceLoaded(balance)),
                            () => dispatch(balanceLoadFailed()));
                // } else {
                    // dispatch(balanceLoadFailed());
                // }
            })
            .done();
    };
}

export function refreshBalanceInBackground() {
    return dispatch => {
        moneweb.getBalance().then(balance => dispatch(balanceLoaded(balance))).done();
    };
}
