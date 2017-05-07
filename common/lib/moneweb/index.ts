import serialize from '../utils/serialize';

export const MONEWEB_BASE_URL = 'http://sodexo-ecole-europeenne.moneweb.lu';

// OPTIMIZATION: avoids creating a new RegExp for each field
const hiddenFieldRegex = 'name="(__[A-Z]+)".+value="(.*)"';
const globalHiddenFieldRegex = new RegExp(hiddenFieldRegex, 'g');

function parseHiddenFields(html: string): { [key: string]: string } {
    // Find all hidden fields
    const allHiddenFields = html.match(globalHiddenFieldRegex);
    // match with a global regex returns an array of all matched strings, so capture the key and the value from each
    const hiddenFieldCaptures = allHiddenFields.map((field: string) => field.match(hiddenFieldRegex));
    // Convert into [[key, value], ...]
    // TODO determine if this could be skipped
    const hiddenFieldKeyValuePairs = (hiddenFieldCaptures as Array<any>).map((field: string) => 
        field.slice(Math.max(field.length - 2, 1))
    );
    // convert into {key: value, ...}
    const hiddenFields = hiddenFieldKeyValuePairs.reduce((result, kvPair) => {
        const key = kvPair[0];
        result[key] = kvPair[1];
        return result;
    }, {});

    return hiddenFields;
}

export async function login(username: string, password: string): Promise<boolean> {
    const initialText = await (await fetch(MONEWEB_BASE_URL)).text();

    const fields = parseHiddenFields(initialText);

    const loginResponse = await fetch(`${MONEWEB_BASE_URL}/default.aspx`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: serialize({
            ...fields,
            __EVENTTARGET: 'login$ctl00$btnConnexion',
            login$ctl00$tbLogin: username,
            login$ctl00$tbPassword: password,
        }),
    });
    return loginResponse.url.indexOf('convive') !== -1;
}

export async function getBalance(): Promise<string> {
    const response = await (await fetch(`${MONEWEB_BASE_URL}/Services/profil.asmx/GetProfil`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })).text();
    if(response.indexOf('Erreur') > 0) {
        throw new Error('Getting balance failed (not logged in?)');
    }
    return response.match(/([0-9]+,[0-9]{2}) €/)[1];
}
