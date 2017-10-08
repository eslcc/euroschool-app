/* eslint-env jest */
import 'react-native';
import * as React from 'react';
import { Startup } from '../component';
import renderer from 'react-test-renderer';

describe('Startup component', () => {
    it('renders correctly', () => {
       const tree = renderer.create(<Startup loadApp={jest.fn()} />).toJSON();

       expect(tree).toMatchSnapshot();
    });
});
