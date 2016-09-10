import { getLoginStatus } from '../lib/msm/login';
import { getSchedule } from '../lib/msm/schedule';

import {
    STARTUP_COMPLETED,
    LOGIN_NEEDED,
    LOAD_SCHEDULE,
    SCHEDULE_LOADED,
} from './ActionTypes';

export const startupCompleted = () => ({
    type: STARTUP_COMPLETED,
});

export const loginNeeded = () => ({
    type: LOGIN_NEEDED,
});

export function appLoaded(dispatch) {
    return getLoginStatus().then(
    status => dispatch(status ? startupCompleted() : loginNeeded())
  );
}

export const scheduleLoaded = (schedule) => ({
    type: SCHEDULE_LOADED,
    schedule,
});

export function loadSchedule(start, end) {
    return (dispatch) => {
        dispatch({ type: LOAD_SCHEDULE });
        return getSchedule(start, end).then(
        schedule => dispatch(scheduleLoaded(schedule))
      );
    };
}
