import * as React from 'react';
import { Provider } from 'react-redux';
const { Font } = require('expo');
const {
    NavigationProvider,
    StackNavigation,
    NavigationContext,
} = require ('@expo/ex-navigation');

const { StyleProvider } = require('@shoutem/theme');

import store from './Store';
import Router from './router';
import theme from './theme';

import LayoutHelper from './Helpers/Layout/component';

const navigationContext = new NavigationContext({
    router: Router,
    store: store,
});

interface AppState {
    downloaded?: number;
    total?: number;
}

class Euroschool extends React.Component<void, AppState> {
    constructor() {
        super();
        this.state = {
            downloaded: undefined,
            total: undefined,
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Rubik-Black': require('../../assets/fonts/Rubik-Black.ttf'),
            'Rubik-BlackItalic': require('../../assets/fonts/Rubik-BlackItalic.ttf'),
            'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
            'Rubik-BoldItalic': require('../../assets/fonts/Rubik-BoldItalic.ttf'),
            'Rubik-Italic': require('../../assets/fonts/Rubik-Italic.ttf'),
            'Rubik-Light': require('../../assets/fonts/Rubik-Light.ttf'),
            'Rubik-LightItalic': require('../../assets/fonts/Rubik-LightItalic.ttf'),
            'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
            'Rubik-MediumItalic': require('../../assets/fonts/Rubik-MediumItalic.ttf'),
            'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
            'rubicon-icon-font': require('../../assets/fonts/rubicon-icon-font.ttf'),
          });
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationProvider context={navigationContext}>
                    <StyleProvider style={theme}>
                        <LayoutHelper>
                            <StackNavigation navigatorUID="index" initialRoute={Router.getRoute('startup')}/>
                        </LayoutHelper>
                    </StyleProvider>
                </NavigationProvider>
            </Provider>

        );
    }
}

export default Euroschool;
