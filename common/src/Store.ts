// eslint-disable no-underscore-dangle
// @flow
import { AsyncStorage } from 'react-native';
import { combineReducers, createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
const { createNavigationEnabledStore, NavigationReducer } = require('@expo/ex-navigation');

import middleware from '../lib/utils/middleware';

import { reducer as schedule  }   from './Schedule/state';
import { reducer as login     }   from './Login/state';
import { reducer as canteen   }   from './Canteen/state';
import { reducer as settings  }   from './Settings/state';
import { reducer as exercises }   from './Exercises/state';
import   devtools                 from './Devtools/reducer';
import { reducer as absences  }   from './Absences/state';
import { reducer as layout } from './Helpers/Layout/state';

const mainReducer = combineReducers({
    schedule,
    login,
    canteen,
    settings,
    exercises,
    devtools,
    absences,
    navigation: NavigationReducer,
    layout,
});

function createStore() {
    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(ReduxThunk, ...middleware)
    );

    const createStoreWithNavigation = createNavigationEnabledStore({
        reduxCreateStore,
        navigationStateKey: 'navigation' ,
    });

    // const store = createStoreWithNavigation(reducer, enhancer);
    const store = createStoreWithNavigation(mainReducer, enhancer);

    return store;
}

const store = createStore();

export default store;
