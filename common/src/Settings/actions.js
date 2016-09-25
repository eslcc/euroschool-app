import * as actions from './actionTypes';

export const settingChanged = (key, value) => ({
    type: actions.SETTING_CHANGED,
    key,
    value,
});
