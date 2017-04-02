import { takeLatest } from 'redux-saga';
import { put, select, call, fork } from 'redux-saga/effects';
import { NavigationActions } from '@expo/ex-navigation';
import Cache from '../../lib/utils/cache';
import * as neutron from '../../lib/appcore/neutron';
import * as msm from '../../lib/msm/login';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import store from '../Store';
import Router from '../router';

const currentNavigatorUID = state => state.navigation.currentNavigatorUID;

function* startup() {
    Cache.clear();
    const status = yield call(msm.getLoginStatus);
    const navigatorUID = yield select(currentNavigatorUID);
    if (status) {
        yield put(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')));
    } else {
        // If login fails (session expiration), the email and password may still be cached.
        // In this case, attempt login with cached credentials.
        const cachedLogin = yield call(Cache.get, 'logindata');
        if (cachedLogin) {
            const { email, password } = cachedLogin;
            const result = yield call(neutron.login, email, password);
            if (result) {
                yield put(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')));
            } else {
                yield put(NavigationActions.replace(navigatorUID, Router.getRoute('login')))
            }
        } else {
            yield put(NavigationActions.replace(navigatorUID, Router.getRoute('login')))
        }
    }
}

export default function*() {
    yield takeLatest(actionTypes.CHECK_LOGIN, startup);
}
