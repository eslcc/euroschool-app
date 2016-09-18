import serialize from '../utils/serialize';

const MONEWEB_BASE_URL = 'http://sodexo-ecole-europeenne.moneweb.lu';

const hiddenFieldRegex = 'name="(__[A-Z]+)".+value="(.*)"';
// OPTIMIZATION: avoids creating a new RegExp for each field
const globalHiddenFieldRegex = new RegExp(hiddenFieldRegex, 'g');

export function login(username, password) {
    return fetch(MONEWEB_BASE_URL)
        .then(request => request.text())
        .then(text => text.match(globalHiddenFieldRegex))
        .then(matches =>
            matches.map(match => match.match(hiddenFieldRegex))
        )
        .then(fields =>
            fields.map(field => field.slice(Math.max(field.length - 2, 1)))
        )
        .then(fields =>
            fields.reduce((o, currentArray) => {
                const key = currentArray[0];
                o[key] = currentArray[1]; // eslint-disable-line
                return o;
            }, {})
        )
        .then(fields =>
            fetch(`${MONEWEB_BASE_URL}/default.aspx`, {
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
            })
        )
        .then(response =>
            response.url.indexOf('convive') !== -1
        );
}

export function getBalance() {
    return fetch(`${MONEWEB_BASE_URL}/Services/profil.asmx/GetProfil`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.text())
    .then(text => text.match(/([0-9]+,[0-9]{2}) €/)[1]);
}
