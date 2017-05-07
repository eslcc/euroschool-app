import { set } from 'lodash';

const initialState = {};

export const SETTING_CHANGED = 'euroschool.SETTING_CHANGED';

export const settingChanged = (key, value) => ({
    type: SETTING_CHANGED,
    key,
    value,
});

export const reducer = (state = initialState, action) => {
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
