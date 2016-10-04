import {
    LOAD_SCHEDULE,
    SCHEDULE_LOADED,
} from './actionTypes';

const initialState = {
    schedule: null,
    scheduleLoading: true,
    lastUpdate: -1,
    start: -1,
    end: -1,
};

export default (state = initialState, action = {}) => {
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
