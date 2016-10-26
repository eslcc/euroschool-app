import * as actions from './actionTypes';

const initialState = {
    list: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.ABSENCES_LOADED:
            return {
                ...state,
                list: action.list,
            };
        default:
            return state;
    }
};
