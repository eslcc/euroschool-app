import { Client } from 'bugsnag-react-native';
import { pickBy } from 'lodash';
import bugsnag from '../bugsnag';

const FILTER = [
    'moneweb.username',
    'moneweb.password',
    'teacher_name_list'
];

export default store => next => action => {
    let actionString = JSON.stringify(action);
    const filtered = FILTER.find(str => actionString.indexOf(str) > -1);
    if (filtered) {
        actionString = `[FILTERED (${filtered})]`;
    }
    bugsnag.leaveBreadcrumb('Redux', {
        action: actionString,
        type: 'state',
    })
    return next(action);
};
