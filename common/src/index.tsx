import React from 'react';
import { connect, Provider } from 'react-redux';
const {
    NavigationProvider,
    StackNavigation,
    NavigationContext,
} = require ('@expo/ex-navigation');
import { Text } from 'react-native';
const { StyleProvider } = require('@shoutem/theme');

import styles from '../styles';
import store from './Store';
import Router from './router';
import theme from './theme';

interface TabIconProps {
    selected: boolean;
    title: string;
}

const TabIcon = (props: TabIconProps) => (
    <Text style={{ color: props.selected ? 'red' : styles.colors.subText }}>
        {props.title}
    </Text>
);

// const {whyDidYouUpdate} = require('why-did-you-update')
// whyDidYouUpdate(React, { exclude: /(Navigation|MK|Touchable)/ })

const navigationContext = new NavigationContext({
    router: Router,
    store: store,
});


const Euroschool = () => (
    <Provider store={store}>
        <NavigationProvider context={navigationContext}>
            <StyleProvider style={theme}>
                <StackNavigation navigatorUID="index" initialRoute={Router.getRoute('startup')}/>
            </StyleProvider>
        </NavigationProvider>
    </Provider>
);

export default Euroschool;
