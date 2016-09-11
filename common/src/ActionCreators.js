import { Actions } from 'react-native-router-flux';

import { getLoginStatus, login } from '../lib/msm/login';
import getSchedule from '../lib/msm/schedule';

import {
    STARTUP_COMPLETED, // TODO: import * from './ActionTypes'
    LOGIN_NEEDED,
    LOGIN_FAILED,
    LOAD_SCHEDULE,
    SCHEDULE_LOADED,
} from './ActionTypes';


export const startupCompleted = () => ({
    type: STARTUP_COMPLETED,
});

export const loginNeeded = () => ({
    type: LOGIN_NEEDED,
});
export const loginFailed = () => ({
    type: LOGIN_FAILED,
});

export const loadApp = () =>
    () =>
        getLoginStatus().then(
            (status) => {
                if (status)
                    Actions.main();
                else
                    Actions.login();
            }
        ).done();

export const doLogin = (email: string, password: string) => (dispatch: func) => {
    login(email, password)
        .then((status: boolean) => {
            if (status)
                Actions.main();
            else
                dispatch(loginFailed());
        }).done(); // TODO catch
};

export const scheduleLoaded = (schedule) => ({
    type: SCHEDULE_LOADED,
    schedule,
});

export function loadSchedule(start, end) {
    return (dispatch) => {
        dispatch({ type: LOAD_SCHEDULE });
        return getSchedule(start, end).then(
          schedule => dispatch(scheduleLoaded(schedule))
        ).done();
    };
}
