import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import * as moneweb from '../../lib/moneweb';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

const monewebSettings = state => state.settings.moneweb;

function* loadBalance() {
    const settings = yield select(monewebSettings);
    if (!settings || !settings.username || !settings.password) {
        yield put(actions.balanceLoadFailed());
    } else {
        try {
            yield call(moneweb.login, settings.username, settings.password);
            const balance = yield call(moneweb.getBalance);
            yield put(actions.balanceLoaded(balance));
        } catch (e) {
            yield put(actions.balanceLoadFailed());
        }
    }
}

export default function* () {
    yield takeEvery(actionTypes.LOADING_BALANCE, loadBalance);
}
