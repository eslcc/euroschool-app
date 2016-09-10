import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import RouteReducer from './reducers/RouteReducer';

const MainReducer = combineReducers({
    RouteReducer,
});

export default () => createStore(MainReducer, applyMiddleware(thunk));
