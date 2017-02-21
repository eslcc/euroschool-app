/* eslint-env jest */
require('react-native-mock/mock');
import React from 'react';
import { SettingsView as Settings } from '../component';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

jest.mock('Linking', () => {
    return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        openURL: jest.fn(),
        canOpenURL: jest.fn(),
        getInitialURL: jest.fn(),
    }
});

describe('Settings component', () => {
    it('renders correctly', () => {
        const tree = shallow(<Settings settings={{}}/>);

        expect(tree.html()).toMatchSnapshot();
    });
});
