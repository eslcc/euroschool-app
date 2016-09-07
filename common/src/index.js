import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from './Store';
import MasterComponent from './MasterComponent';

export default class Euroschool extends Component
{
    render()
    {
        return (
            <Provider store = { createStore() }>
                <MasterComponent />
            </Provider>
        );
    }
}
