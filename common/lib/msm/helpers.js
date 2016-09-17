import serialize from '../utils/serialize';

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


export function doMsmRequest(
    method: string,
    path: string,
    params: {[key: string]: string}
): Promise<any | string> {
    const args = {
        credentials: 'include',
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
