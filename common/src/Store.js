import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import RouteReducer from './reducers/RouteReducer';
import StartupReducer from './reducers/StartupReducer';
import ScheduleReducer from './reducers/ScheduleReducer';

const MainReducer = combineReducers({
    RouteReducer,
    StartupReducer,
    ScheduleReducer,
});

export default () => createStore(MainReducer, applyMiddleware(thunk));
