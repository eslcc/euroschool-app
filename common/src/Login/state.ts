const { NavigationActions } = require('@expo/ex-navigation');
import * as msmLogin from '../../lib/msm/login';
import Cache from '../../lib/utils/cache';
import Router from '../router';

const actionTypes = {
    LOGIN_FAILED: 'euroschool.LOGIN_FAILED',
    LOGIN_ATTEMPT: 'euroschool.YoMamaSoUgly.NobodyWillSeeHerHereAnyway',
    LOGIN_SUCCESS: 'euroschool.LOGIN_ATTEMPT',
    LOGIN_PROGRESS: 'euroschool.LOGIN_PROGRESS',
};

interface State {
    failed: boolean;
    inProgress: boolean;
    progress: string[];
}

const initialState: State = {
    failed: false,
    inProgress: false,
    progress: [],
};

const selectors = {
    inProgress: (state: any) => state.login.inProgress,
    failed: (state: any) => state.login.failed,
    progress: (state: any) => state.login.progress,
};

// const EMAIL_WHITELIST = [
//     'polakoma@student.eursc.eu',
//     'mikucivi@student.eursc.eu',
// ];

const loginAttempt = (email: string, password: string) =>
    async (dispatch: (action: any) => void, getState: () => any) => {
        const navigatorUID = getState().navigation.currentNavigatorUID;

        dispatch({ type: actionTypes.LOGIN_ATTEMPT });

        const result = await msmLogin.neutronLogin(email, password, progress => {
            dispatch({
                type: actionTypes.LOGIN_PROGRESS,
                progress,
            });
        });
        if (result) {
            Cache.set(
                'logindata',
                { email, password },
                { expires: (new Date().getTime() / 1000) + 2678400 } // 31 days
            );

            dispatch({ type: actionTypes.LOGIN_SUCCESS });
            dispatch(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')));
        } else {
            dispatch({ type: actionTypes.LOGIN_FAILED });
        }
    };


const reducer = (state = initialState, action: any) => {
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
        case actionTypes.LOGIN_PROGRESS:
            return {
                ...state,
                progress: [ action.progress, ...state.progress],
            };
        default:
            return state;
    }
};

const actions = {
    loginAttempt,
};

export {
    actionTypes,
    actions,
    reducer,
    selectors,
};
