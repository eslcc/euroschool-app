// @flow

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
};

export const URL_BASE : string = 'https://es.msm.io';

/* eslint-disable */
export function serialize(obj : {[key: string]: string}, prefix : string) : string {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
            str.push(typeof v == 'object' ?
            serialize(v, k) :
            encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
}
/* eslint-enable */

export function doMsmRequest(
    method : string,
    path : string,
    params : {[key: string]: string}
): Promise<any | string>
{
    const args = {
        credentials: 'same-origin',
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    switch (method)
    {
    case METHODS.GET:
        return fetch(URL_BASE + path, args);

    case METHODS.POST:
        return fetch(URL_BASE + path, { body: serialize(params), ...args });

    default:
        throw new Error('wat');
    }
}
