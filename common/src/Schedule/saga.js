import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import moment from 'moment';
import schedule from '../../lib/msm/schedule';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as selectors from './selectors';

function* loadSchedule(action = { start: null, end: null }) {
    const result = yield call(
        schedule,
        action.start || moment() // first day of this week
            .isoWeekday(1)
            .set({ hour: 0, minute: 0, second: 0 })
            .unix(),
        action.end || moment() // last day of this week
            .isoWeekday(7)
            .set({ hour: 23, minute: 59, second: 59 })
            .unix()
    );
    yield put(actions.scheduleLoaded(result.schedule, result.start, result.end));
}

function* refreshScheduleIfNeeded() {
    const updated = yield select(selectors.lastUpdate);
    if ((new Date().valueOf() - updated) > 86400000) { // last updated more than a day ago
        yield call(loadSchedule, {});
    }
}

export default function* () {
        yield [
            takeEvery(actionTypes.LOAD_SCHEDULE, loadSchedule),
            takeEvery(actionTypes.REFRESH_SCHEDULE_IF_NEEDED, refreshScheduleIfNeeded),
        ];
}
