import Cache from '../../lib/utils/cache';
import * as msm from '../../lib/msm/login';
const { NavigationActions } = require('@expo/ex-navigation');
import Router from '../router';

export const CHECK_LOGIN = 'euroschool.CHECK_LOGIN';

export const checkLogin = () => async (dispatch, getState) => {
    Cache.clear();
    const navigatorUID = getState().navigation.currentNavigatorUID;

    const status = await msm.getLoginStatus();
    if (status) {
        // We're logged in already
        dispatch(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')));
    } else {
        // If login fails (session expiration), the email and password may still be cached.
        // In this case, attempt login with cached credentials.
        const cachedLogin = await Cache.get('logindata');
        if (cachedLogin) {
            const { email, password } = cachedLogin;
            const loginResult = await msm.neutronLogin(email, password);
            if (result) {
                // Login with cached credentials succeeded
                dispatch(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')));
            } else {
                // Cached credentials invalid
                dispatch(NavigationActions.replace(navigatorUID, Router.getRoute('login')))
            }
        } else {
            // No cached credentials
            dispatch(NavigationActions.replace(navigatorUID, Router.getRoute('login')))
        }
    }
};


