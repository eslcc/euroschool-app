import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, RefreshControl } from 'react-native';
const { Button, Heading, View } = require('@shoutem/ui');
const TimeAgo = require('react-native-timeago');
import { actions, selectors } from './state';
import styles from '../../styles';

// This is the bit where I wank off a horse to make debugging work.
// Except it actually breaks everything. Don't wank off horses, kids.

/* eslint-disable */
// const _XHR = GLOBAL.originalXMLHttpRequest ?
//     GLOBAL.originalXMLHttpRequest :
//     GLOBAL.XMLHttpRequest
//
// XMLHttpRequest = _XHR
/* eslint-enable */

interface BalanceProps {
    loadBalance: () => void;
    loaded: boolean;
    loading: boolean;
    loadFailed: boolean;
    balance: string;
    refreshBalanceInBackground: () => void;
    lastUpdate: number;
}


class Balance extends Component<BalanceProps, void> {
    componentDidMount() {
        this.props.loadBalance();
    }

    render() {
        if (this.props.loadFailed) {
            return (
                <View style={styles.core.screenContainer}>
                    <Text style={styles.t}>Could not access balance.</Text>
                    <Text style={styles.t}>Please make sure you have set your credentials in settings.</Text>
                    <Button onPress={this.props.loadBalance}>
                        <Text>RETRY</Text>
                    </Button>
                </View>
            );
        }

        // Currently broken
        // const refresh = new RefreshControl({ refreshing: this.props.loading, onRefresh: this.props.loadBalance });

        return (
            <ScrollView
                style={styles.core.screenContainer}
            >
                {/* The double nested view is so the pull-to-refresh appears              */}
                {/* directly below the navbar but the content still has a margin above it */}
                <View style={styles.core.screenContainer}>
                    <Heading styleName="" style={{ fontSize: 28, color: styles.colors.primaryText }}>
                        €{this.props.balance}
                    </Heading>
                    <Text style={styles.t}>Last updated <TimeAgo time={this.props.lastUpdate} /></Text>
                    <Button onPress={this.props.loadBalance}>
                        <Text>REFRESH</Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state: any) => ({
    balance: selectors.balance(state),
    loading: selectors.loading(state),
    loaded: selectors.loaded(state),
    loadFailed: selectors.loadFailed(state),
    lastUpdate: selectors.lastUpdate(state),
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    loadBalance: () => dispatch(actions.loadBalance()),
    refreshBalanceInBackground: () => dispatch(actions.refreshBalanceInBackground()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
