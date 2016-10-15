import { AsyncStorage } from 'react-native';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'

import RootSaga from './RootSaga';

/* eslint-disable no-multi-spaces */

import route     from './Route/reducer';
import startup   from './Startup/reducer';
import schedule  from './Schedule/reducer';
import login     from './Login/reducer';
import canteen   from './Canteen/reducer';
import settings  from './Settings/reducer';
import exercises from './Exercises/reducer';

/* eslint-enable no-multi-spaces */

const mainReducer = combineReducers({
    route,
    startup,
    schedule,
    login,
    canteen,
    settings,
    exercises,
});

export default function () {
    const sagaMiddleware = createSagaMiddleware();

    const enhancer = compose(
      applyMiddleware(sagaMiddleware),
      global.reduxNativeDevTools ? global.reduxNativeDevTools(/*options*/) : nope => nope,
    );

    // Fuckery to allow us to reset the state for debugging.
    const reducer = (state, action) => {
        if (action.type === 'debug.RESET_STATE') {
            state = undefined; // eslint-disable-line
        }
        return mainReducer(state, action);
    };

    const store = createStore(reducer, enhancer, autoRehydrate());

    sagaMiddleware.run(RootSaga);

    const persistor = persistStore(store, {
        blacklist: ['route', 'startup'],
        storage: AsyncStorage,
    });

    if (global.reduxNativeDevTools) {
        global.reduxNativeDevTools.updateStore(store);
    }

    global.persistor = persistor;

    return store;
}
