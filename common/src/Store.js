import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import RouteReducer from './reducers/RouteReducer';
import StartupReducer from './reducers/StartupReducer';
import ScheduleReducer from './reducers/ScheduleReducer';
import LoginReducer from './reducers/LoginReducer';

const MainReducer = combineReducers({
    RouteReducer,
    StartupReducer,
    ScheduleReducer,
    LoginReducer,
});

export default () => createStore(MainReducer, applyMiddleware(thunk));
