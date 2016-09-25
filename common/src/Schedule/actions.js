import * as actions from './actionTypes';

export const scheduleLoaded = (schedule) => ({
    type: actions.SCHEDULE_LOADED,
    schedule,
});

export const loadSchedule = () => ({
    type: actions.LOAD_SCHEDULE,
});

export const refreshScheduleIfNeeded = () => ({
    type: actions.REFRESH_SCHEDULE_IF_NEEDED,
});
