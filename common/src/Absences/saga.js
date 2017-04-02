import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import Cache from '../../lib/utils/cache';
import absences from '../../lib/euroschool/absences';
import moment from 'moment';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

function* absenceSaga(action) {
    const cached = yield call(Cache.get, 'absences');
    console.log(`Action ${JSON.stringify(action)}`);
    if (cached && !action.bustCache) {
        console.log(`Cached ${JSON.stringify(cached)}`);
        yield put(actions.absencesLoaded(cached.list, cached.lastUpdate));
    } else {
        console.log('Not using cache');
        const list = yield call(absences);
        yield call(
            Cache.set,
            'absences',
            { list, lastUpdate: new Date().valueOf() },
            { expires: moment().set({ hour: 23, minute: 59, second: 59 }).unix() }
        );
        yield put(actions.absencesLoaded(list));
    }
}

export default function* () {
    yield takeEvery(actionTypes.LOAD_ABSENCES, absenceSaga);
}
