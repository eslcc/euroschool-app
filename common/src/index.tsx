import React from 'react';
import { Provider } from 'react-redux';
const {
    NavigationProvider,
    StackNavigation,
    NavigationContext,
} = require ('@expo/ex-navigation');

const { StyleProvider } = require('@shoutem/theme');
import CodePush from "react-native-code-push";


import store from './Store';
import Router from './router';
import theme from './theme';

// const {whyDidYouUpdate} = require('why-did-you-update')
// whyDidYouUpdate(React, { exclude: /(Navigation|MK|Touchable)/ })

const navigationContext = new NavigationContext({
    router: Router,
    store: store,
});


class Euroschool extends React.Component<{}, {}> {
    componentDidMount() {
        CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE });
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationProvider context={navigationContext}>
                    <StyleProvider style={theme}>
                        <StackNavigation navigatorUID="index" initialRoute={Router.getRoute('startup')}/>
                    </StyleProvider>
                </NavigationProvider>
            </Provider>

        );
    }
}

export default Euroschool;
