import { Client } from 'bugsnag-react-native';
import { pickBy } from 'lodash';

const bugsnag = new Client();

export default store => next => action => {
    bugsnag.leaveBreadcrumb('Redux', {
        action: JSON.stringify(action),
        type: 'state',
    })
    return next(action);
};
