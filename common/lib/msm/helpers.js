import serialize from '../utils/serialize';

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
};

export const URL_BASE : string = 'https://es.msm.io';

export function doMsmRequest(
    method: string,
    path: string,
    params: {[key: string]: string}
): Promise<Response> {
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
            throw new Error(`Unexpected request method (allowed GET and POST, given ${method})`);
    }
}
