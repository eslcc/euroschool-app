import { LOADING_BALANCE, BALANCE_LOADED } from '../ActionTypes';

const initialState = {
    loaded: false,
    loadInProgress: false,
    balance: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_BALANCE:
            return {
                ...state,
                loaded: false,
                loadInProgress: true,
            };
        case BALANCE_LOADED:
            return {
                ...state,
                loadInProgress: false,
                loaded: true,
                balance: action.balance,
            };
        default:
            return state;
    }
};
