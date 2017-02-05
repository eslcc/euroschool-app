// @flow
import Cookie from 'react-native-cookie';
import moment from 'moment';
import {doAppcoreRequest, METHODS} from '../utils/requestHelpers';

declare type LoginResult = {
    error: boolean;
    cookie: string
}

// eslint-disable-next-line import/prefer-default-export
export function login(email: string, password: string): Promise<LoginResult> {
    return doAppcoreRequest(METHODS.POST, '/neutron/login', {
        email,
        password,
    }).then((data: LoginResult): LoginResult => {
        if (data.cookie)
            return Cookie.set('https://sms.eursc.eu', 'PHPSESSID', data.cookie, {
                path: '/',
                expires: moment().add(5, 'y').toDate(),
            }).then((): LoginResult => data);
        return data;
    });
}
