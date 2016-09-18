import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import route from './reducers/RouteReducer';
import startup from './reducers/StartupReducer';
import schedule from './reducers/ScheduleReducer';
import login from './reducers/LoginReducer';
import canteen from './reducers/CanteenReducer';
import settings from './reducers/SettingsReducer';

const MainReducer = combineReducers({
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

    const store = createStore(MainReducer, enhancer);

    if (global.reduxNativeDevTools) {
        global.reduxNativeDevTools.updateStore(store);
    }

    return store;
}
