import {
    LOAD_SCHEDULE,
    SCHEDULE_LOADED,
} from './actionTypes';

const initialState = {
    schedule: null,
    scheduleLoading: false,
};

export default function schedule(state = initialState, action) {
    switch (action.type) {
    case LOAD_SCHEDULE:
        return state.merge({
            scheduleLoading: true,
        });
    case SCHEDULE_LOADED:
        return state.merge({
            scheduleLoading: false,
            schedule: action.schedule,
        });
    }
}
