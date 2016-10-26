import { fork } from 'redux-saga/effects';

import Canteen from './Canteen/saga';
import Schedule from './Schedule/saga';
import Login from './Login/saga';
import Startup from './Startup/saga';
import Exercises from './Exercises/saga';
import Absences from './Absences/saga';

export default function* () {
    yield [
        fork(Canteen),
        fork(Schedule),
        fork(Login),
        fork(Startup),
        fork(Exercises),
        fork(Absences),
    ];
}
