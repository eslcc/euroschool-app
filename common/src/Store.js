import { AsyncStorage } from 'react-native';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import _ from 'lodash';

import RootSaga from './RootSaga';

/* eslint-disable no-multi-spaces */

import route     from './Route/reducer';
import startup   from './Startup/reducer';
import schedule  from './Schedule/reducer';
import login     from './Login/reducer';
import canteen   from './Canteen/reducer';
import settings  from './Settings/reducer';
import exercises from './Exercises/reducer';
import devtools  from './Devtools/reducer';
import absences  from './Absences/reducer';

/* eslint-enable no-multi-spaces */

const mainReducer = combineReducers({
    route,
    startup,
    schedule,
    login,
    canteen,
    settings,
    exercises,
    devtools,
    absences,
});

export default function () {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            /* options */
        }) :
        compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    // Fuckery to allow us to reset the state for debugging.
    const reducer = (state, action) => {
        if (action.type === 'debug.RESET_STATE') {
            state = undefined; // eslint-disable-line
        }
        const outcome = mainReducer(state, action);

        const diff = _.pickBy(outcome, (value, key) => { // eslint-disable-line
            return !state ? true : state[key] !== value;
        });

        outcome.devtools.log.push({ action, diff });

        return outcome;
    };

    const store = createStore(reducer, enhancer, autoRehydrate());

    sagaMiddleware.run(RootSaga);

    const persistor = persistStore(store, {
        blacklist: ['route', 'startup', 'devtools'],
        storage: AsyncStorage,
    });

    if (global.reduxNativeDevTools) {
        global.reduxNativeDevTools.updateStore(store);
    }

    global.persistor = persistor;

    return store;
}
