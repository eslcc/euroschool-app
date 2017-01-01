import * as actions from './actionTypes';

export const scheduleLoaded = (schedule, start, end) => ({
    type: actions.SCHEDULE_LOADED,
    schedule,
    start,
    end,
});

export const loadSchedule = () => ({
    type: actions.LOAD_SCHEDULE,
});

export const refreshScheduleIfNeeded = () => ({
    type: actions.REFRESH_SCHEDULE_IF_NEEDED,
});
