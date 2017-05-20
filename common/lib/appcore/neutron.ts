const Cookie = require('react-native-cookie');
const moment = require('moment');
import { doAppcoreRequest, METHODS } from '../utils/requestHelpers';

interface LoginResult {
    error: boolean;
    cookie?: string;
}

interface NeutronLoginResponse {
    error: boolean;
    cookie?: string;
}

export async function login(email: string, password: string): Promise<LoginResult> {
    const result = await doAppcoreRequest(METHODS.POST, '/neutron/login', {
        email,
        password,
    }) as NeutronLoginResponse;
    if (!result.error) {
        await Cookie.set('https://sms.eursc.eu', 'PHPSESSID', result.cookie, {
            path: '/',
            expires: moment().add(5, 'y').toDate(),
        });
    }
    return result;
}
