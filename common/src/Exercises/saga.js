import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import moment from 'moment';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import msmSchedule from '../../lib/msm/schedule';
import msmExercise from '../../lib/msm/exercises';

const loadedSchedule = state => state.schedule;

function* filterAndPut(scheduleData) {
    const filtered = scheduleData.filter(
        item => item.entry_type === 'Exercise'
    );

    yield put(actions.exercisesLoaded(filtered));
}

function* exerciseSaga(action = { start: null, end: null }) {
    try {
    // WIZARD SHIT:
    // If the schedule is already loaded, and the user only asks for one week,
    // we don't need a server round trip - all the data is already in redux.
        const localSchedule = yield select(loadedSchedule);
        const { start, end } = action;

        const s = start || moment() // first day of this week
                        .isoWeekday(1)
                        .set({ hour: 0, minute: 0, second: 0 });
        const e = end || moment() // last day of this week
                        .isoWeekday(1)
                        .set({ hour: 23, minute: 59, second: 59 })
                        .add(6, 'd');

        if (localSchedule.schedule !== null && localSchedule.start === s && localSchedule.end === e) {
            yield call(filterAndPut, localSchedule.schedule);
        } else {
            const data = yield call(msmSchedule, s, e);
            yield call(filterAndPut, data.schedule);
        }
    } catch (e) {
        console.error(e);
    }
}

function* exerciseDetailSaga(action) {
    try {
        const { id } = action;
        const detail = yield call(msmExercise, id);
        // Note: Exercise details are cached clientside. We still hit the server
        // for them in case they have updated.
        yield put(actions.exerciseDetailLoaded(id, detail));
    } catch (e) {
        console.error(e);
    }
}

export default function* () {
    yield [
        takeEvery(actionTypes.LOAD_EXERCISES, exerciseSaga),
        takeEvery(actionTypes.LOAD_EXERCISE_DETAIL, exerciseDetailSaga),
    ];
}
