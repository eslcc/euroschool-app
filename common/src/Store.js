import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import MasterReducer from './MasterReducer';

export default () => createStore(MasterReducer, applyMiddleware(thunk));
