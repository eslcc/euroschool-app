import * as moneweb from '../../lib/moneweb';

const actionTypes = {
    LOADING_BALANCE: 'euroschool.LOADING_BALANCE',
    BALANCE_LOADED: 'euroschool.BALANCE_LOADED',
    BALANCE_LOAD_FAILED: 'euroschool.BALANCE_LOAD_FAILED',
    REFRESH_BALANCE: 'euroschool.REFRESH_BALANCE',
};



const initialState = {
    loaded: false,
    loadInProgress: false,
    loadFailed: false,
    balance: '',
    lastUpdate: -1,
};

const selectors = {
    settings: (state: any) => state.settings.moneweb,
    balance: (state: any) => state.canteen.balance,
    loading: (state: any) => state.canteen.loadInProgress,
    loaded: (state: any) => state.canteen.loaded,
    loadFailed: (state: any) => state.canteen.loadFailed,
    lastUpdate: (state: any) => state.canteen.lastUpdate,
};

const loadBalance = () => async (dispatch: (action: any) => void, getState: () => any) => {
    dispatch({ type: actionTypes.LOADING_BALANCE });

    const settings = selectors.settings(getState());

    if (!settings || !settings.username || !settings.password) {
        dispatch({ type: actionTypes.BALANCE_LOAD_FAILED });
    } else {
        try {
            await moneweb.login(settings.username, settings.password);

            const balance = await moneweb.getBalance();
            dispatch({ type: actionTypes.BALANCE_LOADED, balance });
        } catch (e) {
            dispatch({ type: actionTypes.BALANCE_LOAD_FAILED });
        }
    }
};


const refreshBalanceInBackground = () => ({
    type: actionTypes.REFRESH_BALANCE,
});


const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOADING_BALANCE:
            return {
                ...state,
                loaded: false,
                loadInProgress: true,
            };
        case actionTypes.BALANCE_LOADED:
            return {
                ...state,
                loadInProgress: false,
                loaded: true,
                loadFailed: false,
                balance: action.balance,
                lastUpdate: new Date().valueOf(),
            };
        case actionTypes.BALANCE_LOAD_FAILED:
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

const actions = {
    loadBalance,
    refreshBalanceInBackground,
};

export {
    actions,
    actionTypes,
    selectors,
    reducer,
};

