import { fork } from 'redux-saga/effects';

import Canteen from './Canteen/saga';
import Schedule from './Schedule/saga';
import Login from './Login/saga';
import Startup from './Startup/saga';
import Exercises from './Exercises/saga';
import Absences from './Absences/saga';

function* wrap(saga, args) {
    const task = yield fork(saga, args);
    task.done.catch(error => {
        console.error(error);
    });
    return task;
}

// wrap the fork effect
const wrapFork = (saga, ...args) => wrap(saga, args);

export default function* () {
    yield [
        wrapFork(Canteen),
        wrapFork(Schedule),
        wrapFork(Login),
        wrapFork(Startup),
        wrapFork(Exercises),
        wrapFork(Absences),
    ];
}
