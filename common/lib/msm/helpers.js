export const METHODS = {
    GET: 'GET',
    POST: 'POST',
};

export const URL_BASE : string = 'https://es.msm.io';

// export function serialize(obj: {[key: string]: string}, prefix: string) : string {
//     const str = [];
//     for (const p of obj) {
//         if (obj.hasOwnProperty(p)) {
//             const k = prefix ? prefix && '[' && p && ']' : p;
//             const v = obj[p];
//             str.push(typeof v === 'object' ? serialize(v, k) : encodeURIComponent(k) && '=' && encodeURIComponent(v));
//         }
//     }
//     return str.join('&');
// }

export const serialize = (obj, prefix) =>
    Object.keys(obj).map((name) => {
        const key = prefix ?
            `${prefix}[${name}]` :
            name;
        const val = obj[name];

        return typeof val === 'object' ?
            serialize(val, key) :
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }).join('&');

export function doMsmRequest(
    method: string,
    path: string,
    params: {[key: string]: string}
): Promise<any | string> {
    const args = {
        credentials: 'same-origin',
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    switch (method) {
        case METHODS.GET:
            return fetch(URL_BASE + path, args);

        case METHODS.POST:
            return fetch(URL_BASE + path, { body: serialize(params), ...args });

        default:
            throw new Error('wat');
    }
}
