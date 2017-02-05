/* eslint-env jest */

jest.mock('react-native-cookie', () => ({ set: jest.fn(() => Promise.resolve()) }));
jest.mock('../utils/requestHelpers');

const neutron = require('./neutron');
const requestHelpers = require('../utils/requestHelpers');
const Cookie = require('react-native-cookie');
import moment from 'moment';

describe('Neutron', () => {
    it('returns the cookie from the response', async() => {
        const data = await neutron.login('test@euroschool.lu', 'testpassword');
        expect(data).toEqual({
            error: false,
            cookie: 'SUCCESS',
        });
    });

    it('calls requestHelpers properly', async() => {
        await neutron.login('test@euroschool.lu', 'testpassword');
        expect(requestHelpers.doAppcoreRequest).toHaveBeenCalledWith(requestHelpers.METHODS.POST, '/neutron/login', {
            email: 'test@euroschool.lu',
            password: 'testpassword',
        });
    });

    it('sets cookies properly', async() => {
        await neutron.login('test@euroschool.lu', 'testpassword');
        expect(Cookie.set).toHaveBeenCalledWith('https://sms.eursc.eu', 'PHPSESSID', 'SUCCESS', {
            path: '/',
            expires: moment().add(5, 'y').toDate(),
        })
    })
});