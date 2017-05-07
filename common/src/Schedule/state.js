import * as moment from 'moment';


import schedule from '../../lib/msm/schedule';

export const LOAD_SCHEDULE = 'euroschool.LOAD_SCHEDULE';
export const SCHEDULE_LOADED = 'euroschool.SCHEDULE_LOADED';
export const REFRESH_SCHEDULE_IF_NEEDED = 'euroschool.REFRESH_SCHEDULE_IF_NEEDED';

const initialState = {
    schedule: null,
    scheduleLoading: true,
    lastUpdate: -1,
    start: -1,
    end: -1,
};

const selectors = {
    schedule: state => state.schedule.schedule,
    lastUpdate: state => state.schedule.lastUpdate,
    loading: state => state.schedule.scheduleLoading,
};

export const loadSchedule = () => async dispatch => {
    dispatch({ type: LOAD_SCHEDULE });

    const result = await schedule(
        action.start || moment() // first day of this week
            .isoWeekday(1)
            .set({ hour: 0, minute: 0, second: 0 })
            .unix(),
        action.end || moment() // last day of this week
            .isoWeekday(7)
            .set({ hour: 23, minute: 59, second: 59 })
            .unix()
    );

    dispatch({
        type: SCHEDULE_LOADED,
        schedule: result.schedule,
        start: result.start,
        end: result.end,
    });
};

export const refreshScheduleIfNeeded = (dispatch, getState) => {
    const lastUpdate = selectors.lastUpdate(getState());

    if ((new Date().valueOf() - lastUpdate) > 86400000) { // last updated more than a day ago
        dispatch(loadSchedule());
    }
};


export const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_SCHEDULE:
            return {
                ...state,
                scheduleLoading: true,
            };
        case SCHEDULE_LOADED:
            return {
                ...state,
                scheduleLoading: false,
                schedule: action.schedule,
                lastUpdate: new Date().valueOf(),
                start: action.start,
                end: action.end,
            };

        default:
            return state;
    }
};
