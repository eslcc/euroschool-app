const { NavigationActions } = require('@expo/ex-navigation');
import * as msmLogin from '../../lib/msm/login';
import Cache from '../../lib/utils/cache';
import Router from '../router';

const actionTypes = {
    LOGIN_FAILED: 'euroschool.LOGIN_FAILED',
    LOGIN_ATTEMPT: 'euroschool.YoMamaSoUgly.NobodyWillSeeHerHereAnyway',
    LOGIN_SUCCESS: 'euroschool.LOGIN_ATTEMPT',
};

const initialState = {
    failed: false,
    inProgress: false,
};

const loginAttempt = (email: string, password: string) => async (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;

    dispatch({ type: actionTypes.LOGIN_ATTEMPT });

    const result = await msmLogin.neutronLogin(email, password);
    if (result) {
        Cache.set(
            'logindata',
            { email, password },
            { expires: (new Date().getTime() / 1000) + 2678400 }, // 31 days
        );

        dispatch({ type: actionTypes.LOGIN_SUCCESS });
        dispatch(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')));
    } else {
        dispatch({ type: actionTypes.LOGIN_FAILED });
    }
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.LOGIN_FAILED:
        return {
            ...state,
            failed: true,
        };
    case actionTypes.LOGIN_ATTEMPT:
        return {
            ...state,
            failed: false,
            inProgress: true,
        };
    case actionTypes.LOGIN_SUCCESS:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const actions = {
    loginAttempt
};

export {
    actionTypes,
    actions,
    reducer
};
