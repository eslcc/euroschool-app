import { SETTING_CHANGED } from '../ActionTypes';
import Settings from '../constants/settings';

/* eslint-disable */ // http://stackoverflow.com/questions/13719593/how-to-set-object-property-of-object-property-of-given-its-string-name-in-ja#
function assign(obj, prop, value) {
    if (typeof prop === "string")
        prop = prop.split(".");

    if (prop.length > 1) {
        var e = prop.shift();
        assign(obj[e] =
                 Object.prototype.toString.call(obj[e]) === "[object Object]"
                 ? obj[e]
                 : {},
               prop,
               value);
    } else
        obj[prop[0]] = value;
}
/* eslint-enable */

const initialState = {};

Object.keys(Settings).forEach(setting => {
    assign(initialState, Settings[setting].key, Settings[setting].default);
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTING_CHANGED: {
            const newState = Object.assign({}, state);
            assign(newState, action.key, action.value);
            return newState;
        }
        default:
            return state;
    }
};
