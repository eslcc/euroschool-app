import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';

import { appLoaded } from '../../ActionCreators';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class Startup extends Component {
    static propTypes = {
        routes: PropTypes.object,
        actions: PropTypes.object,
    };

    static contextTypes = {
        store: PropTypes.object,
    }

    componentDidMount() {
        const { store } = this.context;
        appLoaded(store.dispatch);
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        );
    }

    componentDidUpdate(prevProps) {
        const prevRoute = prevProps.routes.currentRoute;
        const currentRoute = this.props.routes.currentRoute;

        if (currentRoute === 'login' && prevRoute !== currentRoute)
            this.props.actions.login();

        else if (currentRoute === 'home' && prevRoute !== currentRoute)
            this.props.actions.home();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <View style = {styles.container}>
                <Image source = {require('../../../assets/images/StunningPicture.jpg')} />
                <Text>The app is loading, please wait...</Text>
                <MKSpinner />
            </View>
        );
    }
}
