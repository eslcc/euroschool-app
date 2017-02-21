// @flow
import Cookie from 'react-native-cookie';
import moment from 'moment';
import {doAppcoreRequest, METHODS} from '../utils/requestHelpers';

declare type LoginResult = {
    error: boolean;
    cookie: string
}

// eslint-disable-next-line import/prefer-default-export
export async function login(email: string, password: string): Promise<LoginResult> {
    const result = await doAppcoreRequest(METHODS.POST, '/neutron/login', {
        email,
        password,
    });
    if (!result.error) {
        await Cookie.set('https://sms.eursc.eu', 'PHPSESSID', result.cookie, {
            path: '/',
            expires: moment().add(5, 'y').toDate(),
        });
    }
    return result;
}
