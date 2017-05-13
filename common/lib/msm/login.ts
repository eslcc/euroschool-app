// @flow
import cheerio from 'cheerio-without-node-native';
import { doMsmRequest, doRequest, METHODS } from '../utils/requestHelpers';

export async function neutronLogin(email: string, password: string): Promise<boolean> {
    const doFinalForm = async function($: any) {
        const form2 = $('form');
        let formUrl2 = form2.attr('action');
        if (!formUrl2.startsWith('https')) {
            formUrl2 = `https://sts.eursc.eu${formUrl2}`;
        }

        debugger;

        const payload2: any = {};

        form2.find('input[type=\'hidden\']').each((i: never, el: any) => {
            payload2[el.attribs.name] = el.attribs.value;
        });

        return await doRequest(METHODS.POST, formUrl2, payload2);
    };

    try {
        console.log([email, password]);
        const redirectRequest = await doMsmRequest(METHODS.GET, '/sso.php');
        const $1 = cheerio.load(await redirectRequest.text());
        if ($1.html().indexOf('disabled') > -1) {
            const finalResponse = await doFinalForm($1);
            console.log(JSON.stringify((finalResponse.headers as any)['Set-Cookie']));
            return true; // TODO figure out what happens when bullshit is passed
        }
        const form = $1('#loginForm');
        const formUrl = `https://sts.eursc.eu${form.attr('action')}`;
        const formPayload = {
            AuthMethod: 'FormsAuthentication',
            UserName: email,
            Password: password,
        };
        debugger;

        const formRequest = await doRequest(METHODS.POST, formUrl, formPayload);
        const finalResponse = await doFinalForm(cheerio.load(await formRequest.text()));
        console.log(JSON.stringify((finalResponse.headers as any)['Set-Cookie']));
        return true; // TODO figure out what happens when bullshit is passed
    } catch (e) {
        console.log(`FUCKUP! ${e}`);
        throw e;
    }
}

export function logout(): Promise<any> {
    return doMsmRequest(METHODS.GET, '/login.php?m=1', {});
}

export function getLoginStatus(): Promise<Boolean> {
    return doMsmRequest(METHODS.GET, '/', {})
        .then(
            (response: Response): boolean => response.url.indexOf('login') === -1,
        );
}
