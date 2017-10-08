import { pickBy } from 'lodash';

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
    // insert sentry here
    return next(action);
};
