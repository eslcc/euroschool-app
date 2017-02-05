/* eslint-env node, jest */

const helpers = jest.genMockFromModule('../requestHelpers');

helpers.doAppcoreRequest = jest.fn((method, url, args) => {
    let response;
    switch (url) {
        case '/neutron/login':
            response = {
                error: false,
                cookie: 'SUCCESS',
            };
            break;
        default:
            throw new Error(`ERROR: doAppcoreRequest called with unrecongised url ${url}`);
    }
    return Promise.resolve(response);
});

module.exports = helpers;
