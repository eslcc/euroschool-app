import { Client } from 'bugsnag-react-native';
import { pickBy } from 'lodash';
import bugsnag from '../bugsnag';

export default store => next => action => {
    bugsnag.leaveBreadcrumb('Redux', {
        action: JSON.stringify(action),
        type: 'state',
    })
    return next(action);
};
