import { LOAD_ABSENCES, ABSENCES_LOADED } from '../ActionTypes';

const initialState = {
    loaded: false,
    loading: false,
    absences: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ABSENCES:
            return {
                loaded: false,
                loading: true,
            };
        case ABSENCES_LOADED:
            return {
                loaded: true,
                loading: false,
                absences: action.absences,
            };
        default:
            return state;
    }
};
