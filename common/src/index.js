import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from './Store';
import MainComponent from './MainComponent';

export default class Euroschool extends Component {
    render() {
        return (
            <Provider store = { createStore() }>
                <MainComponent />
            </Provider>
        );
    }
}
