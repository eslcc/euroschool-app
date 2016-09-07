import React, { Component } from 'react';
import { View } from 'react-native';

import { getLoginStatus } from '../../../lib/msm/login';
/*
const loadApp = () =>
({
type: 'LOAD_APP',
});
*/

const startupReducer = (state, action) =>
{
    switch (action.type)
    {
    case 'LOAD_APP':
        return state;

    default:
        return state;
    }
};

export default class Startup extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            ready: false,
            needsLogin: false,
        };
    }

    componentDidMount()
    {
        window.setTimeout(
            () =>
            {
                getLoginStatus().then(
                    (loggedIn) =>
                    {
                        const base = { ready: true };
                        this.setState({ needsLogin: !loggedIn, ...base });
                    }
                );
            },
            200
        );
    }

    loginComplete()
    {
        this.setState({ needsLogin: false });
    }

    render()
    {
        let component;

        if (this.state.ready)
            component = this.state.needsLogin ? Login : Home;

        else
            component = StartupMessage;

        return (
            <View>
            { React.createElement(component, { loginCallback: this.loginComplete.bind(this) }) }
            </View>
        );
    }
}
