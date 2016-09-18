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

export const loadApp = () =>
    () =>
        msmLogin.getLoginStatus().then(
            (status) => {
                if (status)
                    Actions.main();
                else
                    Actions.login();
            }
        ).done();

export const doLogin = (email: string, password: string) => (dispatch: func) => {
    msmLogin.login(email, password)
        .then((status: boolean) => {
            if (status)
                Actions.main();
            else
                dispatch(loginFailed());
        }).done(); // TODO catch
};

export const scheduleLoaded = (schedule) => ({
    type: actions.SCHEDULE_LOADED,
    schedule,
});

export function loadSchedule(start, end) {
    return (dispatch) => {
        dispatch({ type: actions.LOAD_SCHEDULE });
        return getSchedule(start, end).then(
          schedule => dispatch(scheduleLoaded(schedule))
        ).done();
    };
}

export function getBalance(username, password) {
    return (dispatch) => {
        dispatch(loadingBalance());
        return moneweb.login(username, password)
            .then(status => {
                // if (status) {
                    moneweb.getBalance()
                        .then(balance => dispatch(balanceLoaded(balance)));
                // } else {
                    // dispatch(balanceLoadFailed());
                // }
            })
            .done();
    };
}
