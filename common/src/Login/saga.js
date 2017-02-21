import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { NavigationActions } from '@exponent/ex-navigation'
import * as neutron from '../../lib/appcore/neutron';
import wrap from '../../lib/utils/saga';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import Router from '../router';

const currentNavigatorUID = state => state.navigation.currentNavigatorUID;

function* login(action) {
    const result = yield call(neutron.login, action.email, action.password);
    const navigatorUID = yield select(currentNavigatorUID);
    if (result) {
        yield put(actions.loginSuccess());
        yield put(NavigationActions.replace(navigatorUID, Router.getRoute('tabScreen')))
    } else {
        yield put(actions.loginFailed());
    }
}

export default function* () {
    yield takeEvery(actionTypes.LOGIN_ATTEMPT, login);
}
