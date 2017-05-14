import serialize from '../utils/serialize';

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
};

export type RequestMethod = string;

export const MSM_URL_BASE: string = 'https://sms.eursc.eu';
export const APPCORE_URL_BASE: string = 'https://eslcc-appcore.herokuapp.com';

export function doRequest(method: string,
                          url: string,
                          params?: {[key: string]: string}): Promise<Response> {
    const args: RequestInit = {
        credentials: 'include',
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    switch (method) {
        case METHODS.GET:
            return fetch(url, args);

        case METHODS.POST:
            return fetch(url, { body: serialize(params), ...args });

        default:
            throw new Error(`Unexpected request method (allowed GET and POST, given ${method})`);
    }
}

export function doMsmRequest(method: string,
                             path: string,
                             params?: {[key: string]: any}): Promise<Response> {
    return doRequest(method, MSM_URL_BASE + path, params);
}

export function doAppcoreRequest(method: string,
                                 path: string,
                                 params?: {[key: string]: any}): Promise<object> {
    return doRequest(method, APPCORE_URL_BASE + path, params)
        .then((response: Response): object => response.json());
}
