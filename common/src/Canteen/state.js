import * as moneweb from '../../lib/moneweb';

export const LOADING_BALANCE = 'euroschool.LOADING_BALANCE';
export const BALANCE_LOADED = 'euroschool.BALANCE_LOADED';
export const BALANCE_LOAD_FAILED = 'euroschool.BALANCE_LOAD_FAILED';
export const REFRESH_BALANCE = 'euroschool.REFRESH_BALANCE';

const initialState = {
    loaded: false,
    loadInProgress: false,
    loadFailed: false,
    balance: '',
    lastUpdate: -1,
};

export const selectors = {
    settings: state => state.settings.moneweb,
};

export const loadBalance = () => async (dispatch, getState) => {
    dispatch({ type: LOADING_BALANCE });

    const settings = selectors.settings(getState());

    if (!settings || !settings.username || !settings.password) {
        dispatch({ type: BALANCE_LOAD_FAILED });
    } else {
        try {
            await moneweb.login(settings.username, settings.password);

            const balance = await moneweb.getBalance();
            dispatch({ type: BALANCE_LOADED, balance });
        } catch (e) {
            dispatch({ type: BALANCE_LOAD_FAILED });
        }
    }
};


export const refreshBalanceInBackground = () => ({
    type: REFRESH_BALANCE,
});


export const reducer = (state = initialState, action) => {
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
                loadFailed: false,
                balance: action.balance,
                lastUpdate: new Date().valueOf(),
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
