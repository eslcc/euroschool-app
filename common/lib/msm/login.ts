const cheerio = require('cheerio-without-node-native');
import { doMsmRequest, doRequest, METHODS } from '../utils/requestHelpers';

export async function neutronLogin(
    email: string,
    password: string,
    progressCallback?: (progress: string) => void
    ): Promise<boolean> {

    const reportProgress = (progress: string) => {
        if (progressCallback) {
            progressCallback(progress);
        }
    };
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

        const result = await doRequest(METHODS.POST, formUrl2, payload2);
        reportProgress(`Final form URL: ${result.url}`);
        return result;
    };

    try {
        const redirectRequest = await doMsmRequest(METHODS.GET, '/sso.php');
        reportProgress('Sent redirect request');
        const $1 = cheerio.load(await redirectRequest.text());
        if ($1.html().indexOf('disabled') > -1) {
            reportProgress('Short-circuiting because disabled');
            await doFinalForm($1);
            
            return await getLoginStatus();
        }
        const form = $1('#loginForm');
        const formUrl = `https://sts.eursc.eu${form.attr('action')}`;
        const formPayload = {
            AuthMethod: 'FormsAuthentication',
            UserName: email,
            Password: password,
        };

        const formRequest = await doRequest(METHODS.POST, formUrl, formPayload);
        reportProgress('Sent second request');
        await doFinalForm(cheerio.load(await formRequest.text()));
        reportProgress('Sent final form');
        
        return await getLoginStatus();
    } catch (e) {
        
        throw e;
    }
}

export function logout(): Promise<any> {
    return doMsmRequest(METHODS.GET, '/login.php?m=1', {});
}

export function getLoginStatus(): Promise<boolean> {
    return doMsmRequest(METHODS.GET, '/', {})
        .then(
            (response: Response): boolean => response.url.indexOf('login') === -1
        );
}
