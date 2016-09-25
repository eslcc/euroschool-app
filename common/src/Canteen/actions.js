import * as actions from './actionTypes';

export const loadBalance = () => ({
    type: actions.LOADING_BALANCE,
});

export const balanceLoaded = (balance) => ({
    type: actions.BALANCE_LOADED,
    balance,
});

export const balanceLoadFailed = () => ({
    type: actions.BALANCE_LOAD_FAILED,
});

export const refreshBalanceInBackground = () => ({
    type: actions.REFRESH_BALANCE,
});
