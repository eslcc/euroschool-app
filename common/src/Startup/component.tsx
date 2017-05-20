import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import { connect } from 'react-redux';

import { actions } from './state';
import styles from '../../styles'; // eslint-disable-line

interface StartupProps {
    loadApp: () => void;
}

export class Startup extends React.Component<StartupProps, {}> {

    componentDidMount() {
        this.props.loadApp();
    }

    render() {
        return (
            <View style={styles.core.screenContainer}>
                <Image source={require('./assets/StunningPicture.jpg')} />
                <Text>The app is loading, please wait...</Text>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    loadApp: () => dispatch(actions.checkLogin()),
});

export default connect(null, mapDispatchToProps)(Startup);
