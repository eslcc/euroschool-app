/* eslint-disable import/no-extraneous-dependencies */
import sinon from 'sinon';

export default {
    getScreenSize: sinon.stub().returns({
        height: 1920,
        width: 1080,
    }),
};
