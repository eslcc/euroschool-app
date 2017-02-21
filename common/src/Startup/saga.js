import {takeLatest} from 'redux-saga';
import {put, select, call} from 'redux-saga/effects';
import { NavigationActions } from '@exponent/ex-navigation';
import * as neutron from '../../lib/appcore/neutron';
import * as msm from '../../lib/msm/login';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import store from '../Store';
import Router from '../router';

const loginPersistedData = state => ({
    email: state.login.email,
    password: state.login.password,
    failed: state.login.failed,
});

const currentNavigatorUID = state => state.navigation.currentNavigatorUID;

function* startup() {
    const status = yield call(msm.getLoginStatus);
    const navigatorUID = yield select(currentNavigatorUID);
    if (status) {
        yield put(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')));
    } else {
        // If login fails (session expiration), the email and password may still be persisted.
        // In this case, attempt login with persisted credentials.
        const login = yield select(loginPersistedData);
        const {email, password, failed} = login;
        if (email !== '' && password !== '' && !failed) {
            const result = yield call(neutron.login, email, password);
            if (result) {
                yield put(NavigationActions.push(navigatorUID, Router.getRoute('tabScreen')));
            } else {
                yield put(actions.loginNeeded());
            }
        } else {
            yield put(NavigationActions.replace(navigatorUID, Router.getRoute('login')))
        }
    }
}

export default function*() {
    yield takeLatest(actionTypes.CHECK_LOGIN, startup);
}
