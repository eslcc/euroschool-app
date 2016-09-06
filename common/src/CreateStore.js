"use strict";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import MasterReducer from './MasterReducer';

export default () =>
{
	return createStore(MasterReducer, applyMiddleware(thunk))
};