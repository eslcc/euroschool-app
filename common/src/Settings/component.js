import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { TextInput, Button } from '@shoutem/ui';

import Settings from './settings';
import { get, each } from 'lodash';

import GlobalStyles from '../../styles';


const styles = StyleSheet.create({
    view: {
        marginTop: 54,
        marginHorizontal: 16,
    },
    header: {
        paddingVertical: 8,
        height: 32,
        fontWeight: '700',
        color: GlobalStyles.colors.primaryText,
    },
});

const renderHeader = (sectionData, category) => <Text style={styles.header}>{category}</Text>;


export class SettingsView extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        dispatch: PropTypes.func,
    };

    static route = {
        navigationBar: {
            title: 'Settings',
        },
    }

    render() {
        return (
            <View style={GlobalStyles.core.screenContainerNoTabs}>
                {Settings.map(setting => setting(this.props.settings, this.props.dispatch))}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(SettingsView);
