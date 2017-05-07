import { Client } from 'bugsnag-react-native';
import { pickBy } from 'lodash';

const bugsnag = new Client();

export default store => next => action => {
    bugsnag.leaveBreadcrumb('Redux', {
        action: pickBy(action, o => typeof o !== 'function'),
        type: 'state',
    })
    return next(action);
};
