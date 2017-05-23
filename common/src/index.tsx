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

const navigationContext = new NavigationContext({
    router: Router,
    store: store,
});

interface AppState {
    downloaded: number;
    total: number;
}

class Euroschool extends React.Component<void, AppState> {
    constructor() {
        super();
        this.state = {
            downloaded: undefined,
            total: undefined,
        };
    }

    componentDidMount() {
        CodePush.sync({
            updateDialog: true,
            installMode: CodePush.InstallMode.IMMEDIATE,
        }, () => {}, progress => {
            this.setState({
                downloaded: progress.receivedBytes,
                total: progress.totalBytes,
            });
        });
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationProvider context={navigationContext}>
                    <StyleProvider style={theme}>
                        <StackNavigation navigatorUID="index" initialRoute={Router.getRoute('startup')}/>
                        {/*{this.state.downloaded && <Text>{this.state.downloaded} of {this.state.total}</Text>}*/}
                    </StyleProvider>
                </NavigationProvider>
            </Provider>

        );
    }
}

export default Euroschool;
