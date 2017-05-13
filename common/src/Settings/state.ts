import { set } from 'lodash';

const initialState = {};

const actionTypes = {
    SETTING_CHANGED: 'euroschool.SETTING_CHANGED',
};

const settingChanged = (key: string, value: string) => ({
    type: actionTypes.SETTING_CHANGED,
    key,
    value,
});

const actions = {
    settingChanged,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SETTING_CHANGED: {
            const newState = Object.assign({}, state);
            set(newState, action.key, action.value);
            return newState;
        }
        default:
            return state;
    }
};

export {
    actionTypes,
    actions,
    reducer
};
