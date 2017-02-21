/* eslint-env node, jest */

const helpers = jest.genMockFromModule('../requestHelpers');

helpers.doAppcoreRequest = jest.fn((method, url, args) => {
    let result;
    switch (url) {
        case '/neutron/login':
            if (args.email.indexOf('fail') !== -1) {
                result = {
                    error: true,
                };
            } else {
                result = {
                    error: false,
                    cookie: 'SUCCESS',
                };
            }
            break;
        default:
            throw new Error(`ERROR: doAppcoreRequest called with unrecongised url ${url}`);
    }
    return Promise.resolve(result);
});

module.exports = helpers;
