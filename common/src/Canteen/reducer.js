import { LOADING_BALANCE, BALANCE_LOADED, BALANCE_LOAD_FAILED } from './actionTypes';

const initialState = {
    loaded: false,
    loadInProgress: false,
    loadFailed: false,
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
        case BALANCE_LOAD_FAILED:
            return {
                ...state,
                loadInProgress: false,
                loaded: false,
                loadFailed: true,
            };
        default:
            return state;
    }
};
