import * as actions from './actionTypes';

const initialState = {
    list: [],
    lastUpdate: -1,
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.LOAD_ABSENCES:
            return {
                ...state,
                loading: true,
            };
        case actions.ABSENCES_LOADED:
            return {
                ...state,
                list: action.list,
                lastUpdate: new Date().valueOf(),
                loading: false,
            };
        default:
            return state;
    }
};
