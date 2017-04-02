import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { NavigationActions } from '@expo/ex-navigation'
import * as neutron from '../../lib/appcore/neutron';
import * as msmLogin from '../../lib/msm/login';
import wrap from '../../lib/utils/saga';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import Router from '../router';
import Cache from '../../lib/utils/cache';

const currentNavigatorUID = state => state.navigation.currentNavigatorUID;

function* login(action) {
    console.dir(action);
    const result = yield call(msmLogin.neutronLogin, action.email, action.password);
    const navigatorUID = yield select(currentNavigatorUID);
    if (result) {
        yield call(
            Cache.set,
            'logindata',
            { email: action.email, password: action.password },
            { expires: (new Date().getTime() / 1000) + 2678400 } // 31 days
        );
        yield put(actions.loginSuccess());
        yield put(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')))
    } else {
        yield put(actions.loginFailed());
    }
}

export default function* () {
    yield takeEvery(actionTypes.LOGIN_ATTEMPT, login);
}
