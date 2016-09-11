import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

import route from './reducers/RouteReducer';
import startup from './reducers/StartupReducer';
import schedule from './reducers/ScheduleReducer';
import login from './reducers/LoginReducer';

const MainReducer = combineReducers({
    route,
    startup,
    schedule,
    login,
});

export default function () {
    const enhancer = compose(
      applyMiddleware(thunk),
      devTools()
    );

    const store = createStore(MainReducer, enhancer);

    devTools.updateStore(store);

    return store;
}
