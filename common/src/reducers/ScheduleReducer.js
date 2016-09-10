import {
    LOAD_SCHEDULE,
    SCHEDULE_LOADED,
} from '../ActionTypes';

const initialState = {
    schedule: null,
    scheduleLoading: false,
};

export default function scheduleReducer(state = initialState, action) {
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

    default:
        return state;
    }
}
