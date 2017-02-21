// eslint-disable no-underscore-dangle
// @flow
import { AsyncStorage } from 'react-native';
import { combineReducers, createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import _ from 'lodash';

import RootSaga from './RootSaga';

/* eslint-disable no-multi-spaces */

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
    startup,
    schedule,
    login,
    canteen,
    settings,
    exercises,
    devtools,
    absences,
    navigation: NavigationReducer,
});

function createStore () {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            /* options */
        })
        : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    // Fuckery to allow us to reset the state for debugging.
    const reducer = (state, action) => {
        if (action.type === 'debug.RESET_STATE') {
            state = undefined; // eslint-disable-line
        }
        return mainReducer(state, action);
    };

    const createStoreWithNavigation = createNavigationEnabledStore({
        reduxCreateStore,
        navigationStateKey: 'navigation',
    });

    // const store = createStoreWithNavigation(reducer, enhancer);
    const store = createStoreWithNavigation(reducer, enhancer, autoRehydrate());

    sagaMiddleware.run(RootSaga);

    persistStore(store, {
        blacklist: ['navigation', 'startup', 'devtools'],
        storage: AsyncStorage,
    });

    return store;
}

const store = createStore();

export default store;
