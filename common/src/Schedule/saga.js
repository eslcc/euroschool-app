import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import schedule from '../../lib/msm/schedule';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* loadSchedule(action = { start: null, end: null }) {
    const result = yield call(schedule, action.start, action.end);
    yield put(actions.scheduleLoaded(result.schedule, result.start, result.end));
}

const lastUpdate = state => state.schedule.lastUpdate;

function* refreshScheduleIfNeeded() {
    const updated = yield select(lastUpdate);
    if ((new Date().valueOf() - updated) > 86400000) { // last updated more than a day ago
        yield call(loadSchedule, {

        });
    }
}

export default function* () {
    yield [
        takeEvery(actionTypes.LOAD_SCHEDULE, loadSchedule),
        takeEvery(actionTypes.REFRESH_SCHEDULE_IF_NEEDED, refreshScheduleIfNeeded),
    ];
}
