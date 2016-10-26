import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import moment from 'moment';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import msmSchedule from '../../lib/msm/schedule';
import msmExercise from '../../lib/msm/exercises';

const loadedSchedule = state => state.schedule;

const loadedStart = state => state.exercises.loadedStart;
const loadedEnd = state => state.exercises.loadedEnd;

function* filterAndPut(scheduleData, start, end) {
    const filtered = scheduleData.filter(
        item => item.entry_type === 'Exercise'
    );

    yield put(actions.exercisesLoaded(filtered, start.unix(), end.unix()));
}

function* exerciseSaga(action = { start: null, end: null }) {
    // WIZARD SHIT:
    // If the schedule is already loaded, and the user only asks for one week,
    // we don't need a server round trip - all the data is already in redux.
    const localSchedule = yield select(loadedSchedule);
    const { start, end } = action;

    const lastLoaded = yield select(loadedStart);
    const lastLoadedEnd = yield select(loadedEnd);


    let s;
    if (moment.isMoment(start)) {
        s = start;
    } else if (lastLoaded) {
        s = moment.unix(lastLoaded);
    } else {
        s = moment() // first day of this week
                        .isoWeekday(1)
                        .set({ hour: 0, minute: 0, second: 0 });
    }

    let e;
    if (moment.isMoment(end)) {
        e = end;
    } else if (lastLoadedEnd) {
        e = moment.unix(lastLoadedEnd);
    } else {
        e = moment() // last day of this week
                    .isoWeekday(7)
                    .set({ hour: 23, minute: 59, second: 59 });
    }


    if (start === 'WEEK_BEFORE') {
        s.subtract(1, 'w');
    }

    if (end === 'WEEK_AFTER') {
        e.add(1, 'w');
    }

    if (localSchedule.schedule !== null && localSchedule.start === s && localSchedule.end === e) {
        yield call(filterAndPut, localSchedule.schedule, s, e, null);
    } else {
        const data = yield call(msmSchedule, s, e);

        yield call(filterAndPut, data.schedule, s, e, null);
    }
}

function* exerciseDetailSaga(action) {
    const { id } = action;
    const detail = yield call(msmExercise, id);
    // Note: Exercise details are cached clientside. We still hit the server
    // for them in case they have updated.
    yield put(actions.exerciseDetailLoaded(id, detail));
}

export default function* () {
    yield [
        takeEvery(actionTypes.LOAD_EXERCISES, exerciseSaga),
        takeEvery(actionTypes.LOAD_EXERCISE_DETAIL, exerciseDetailSaga),
    ];
}
