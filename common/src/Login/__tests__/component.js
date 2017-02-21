/* eslint-env jest */
import 'react-native';
import React from 'react';
import { Login } from '../component';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

const store = failed => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
        login: {
            failed: failed,
        },
    })),
    subscribe: jest.fn(),
});

describe('Startup component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store(false)}>
            <Login />
        </Provider>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('shows the failure indicator', () => {
        const tree = renderer.create(<Provider store={store(true)}>
            <Login />
        </Provider>).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
