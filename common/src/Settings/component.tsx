import React, { Component, PropTypes } from 'react';
import {
    View,
} from 'react-native';
import { connect } from 'react-redux';

import Settings from './settings';
import GlobalStyles from '../../styles';

interface SettingsProps {
    settings: any;
    dispatch: (action: any) => void;
}

export class SettingsView extends Component<SettingsProps, {}> {

    static route = {
        navigationBar: {
            title: 'Settings',
        },
    };

    render() {
        return (
            <View style={GlobalStyles.core.screenContainerNoTabs}>
                {Settings.map(setting => setting(this.props.settings, this.props.dispatch))}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(SettingsView);
