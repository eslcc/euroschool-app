/* eslint-env jest */

import * as moneweb from './index';
import fetch, {Response} from 'node-fetch';

const BALANCE_SUCCESS_TEXT = `{"d":"\u003cdiv class=\"header\"\u003e\r\n\t\u003cdiv class=\"btnImgFermer\"\u003e\r\n\r\n\t\u003c/div\u003e\u003cdiv class=\"clear_both\"\u003e\r\n\r\n\t\u003c/div\u003e\u003cdiv class=\"titre\"\u003e\r\n\t\tMon compte\r\n\t\u003c/div\u003e\u003cdiv class=\"nom\"\u003e\r\n\t\t  POLAKOVS Marks\r\n\t\u003c/div\u003e\u003cdiv class=\"clear_both\"\u003e\r\n\r\n\t\u003c/div\u003e\r\n\u003c/div\u003e\u003cbr /\u003e\u003cdiv class=\"body\"\u003e\r\n\t\u003cdiv class=\"left lg\"\u003e\r\n\t\t\u003cspan class=\"lib\"\u003eSolde : \u003c/span\u003e7,20 €\r\n\t\u003c/div\u003e\u003cdiv class=\"clear_both\"\u003e\r\n\r\n\t\u003c/div\u003e\r\n\u003c/div\u003e"}`;
const BALANCE_FAIL_TEXT = `{"Message":"Erreur lors du traitement de la demande.","StackTrace":"","ExceptionType":""}`;

// These integration tests run the actual code, and thus require actual credentials.
// To avoid flaky runs, it is disabled.
// To run them, change the line below
// and add your credentials in the `moneweb.login` line.
const RUN_INTEGRATION_TESTS = false;

if (RUN_INTEGRATION_TESTS) {
    describe('Moneweb login (integration)', () => {
        it('works (remove me later)', async() => {
            global.fetch = fetch;
            const response = await moneweb.login('INSERT_USERNAME_HERE', 'INSERT_PASSWORD_HERE');
            expect(response).toEqual(true);
        });
    });
} else {
    describe('Moneweb login (integration) (skipped', () => {});
}

describe('Moneweb balance', () => {
    it('returns the balance on success', async() => {
        global.fetch = jest.fn(() => new Response(BALANCE_SUCCESS_TEXT));
        const balance = await moneweb.getBalance();
        expect(balance).toEqual('7,20');
    });

    it('calls fetch properly', async() => {
        global.fetch = jest.fn(() => new Response(BALANCE_SUCCESS_TEXT));
        const balance = await moneweb.getBalance();
        expect(global.fetch).toHaveBeenCalledWith(`${moneweb.MONEWEB_BASE_URL}/Services/profil.asmx/GetProfil`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('fails gracefully', async() => {
        global.fetch = jest.fn(() => new Response(BALANCE_FAIL_TEXT));
        try {
            await moneweb.getBalance();
        } catch(e) {
            expect(e).toMatchSnapshot();
        }
    });
});
