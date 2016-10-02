/* eslint-env node, mocha */
/* eslint-disable import/no-extraneous-dependencies */
/* global expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../../src/Login/component';


describe('<Login />', () => {
    it('should render a View', () => {
        const props = {
        };
        const rendered = shallow(<Login {...props} />);
        const text = rendered.find('View');
        expect(text).to.have.length(3);
    });
});
