import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import absences from '../../lib/euroschool/absences';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

function* absenceSaga() {
    const list = yield call(absences);
    yield put(actions.absencesLoaded(list));
}

export default function* () {
    yield takeEvery(actionTypes.LOAD_ABSENCES, absenceSaga);
}
