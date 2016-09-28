/* eslint-env node, mocha */
/* eslint-disable import/no-extraneous-dependencies */
/* global expect */

import React from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';
import { MKButton, MKColor, MKSpinner } from 'react-native-material-kit';

import { Balance } from '../../../src/Canteen/component';


describe('<Balance />', () => {
    it('should render the balance when given one', () => {
        const props = {
            refreshBalanceInBackground: () => {}, // noop
            loaded: true,
            balance: '12,34 €',
        };
        const rendered = shallow(<Balance {...props} />);
        const text = rendered.find(Text);
        expect(text).to.have.length(1);
        expect(text.props().children).to.equal(props.balance);
    });

    it('should render a spinner when balance is loading', () => {
        const props = {
            loaded: false,
            loading: true,
        };
        const rendered = shallow(<Balance {...props} />);
        expect(rendered.find(MKSpinner)).to.have.length(1);
    });

    it('should render an error message and a retry button in case of error', () => {
        const props = {
            loaded: false,
            loading: false,
        };
        const rendered = shallow(<Balance {...props} />);
        expect(rendered.find(MKSpinner)).to.have.length(0);
        expect(rendered.find(Text)).to.have.length(2);
        expect(rendered.find('BuiltButton')).to.have.length(1);
    });
});
