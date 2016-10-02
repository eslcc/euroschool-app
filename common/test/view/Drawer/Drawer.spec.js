/* eslint-env node, mocha */
/* eslint-disable import/no-extraneous-dependencies */
/* global expect */

import React from 'react';
import { shallow } from 'enzyme';

import Drawer from '../../../src/Drawer/component';


describe('<Drawer />', () => {
    it('should render a DrawerLayoutAndroid', () => {
        const props = {
            navigationState: {
                children: [],
            },
            onNavigate: () => {},
        };
        const rendered = shallow(<Drawer {...props} />);
        const text = rendered.find('DrawerLayoutAndroid');
        expect(text).to.have.length(1);
    });
});
