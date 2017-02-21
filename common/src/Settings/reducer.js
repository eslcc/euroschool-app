import { SETTING_CHANGED } from './actionTypes';
import { set } from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTING_CHANGED: {
            const newState = Object.assign({}, state);
            set(newState, action.key, action.value);
            return newState;
        }
        default:
            return state;
    }
};
