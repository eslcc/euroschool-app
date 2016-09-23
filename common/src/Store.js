import { AsyncStorage } from 'react-native';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import route from './reducers/RouteReducer';
import startup from './reducers/StartupReducer';
import schedule from './reducers/ScheduleReducer';
import login from './reducers/LoginReducer';
import canteen from './reducers/CanteenReducer';
import settings from './reducers/SettingsReducer';

const mainReducer = combineReducers({
    route,
    startup,
    schedule,
    login,
    canteen,
    settings,
});

export default function () {
    const enhancer = compose(
      applyMiddleware(thunk),
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
