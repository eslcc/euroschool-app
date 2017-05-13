import React from 'react';

import { connect } from 'react-redux';
import { View, FlatList, Text, RefreshControl } from 'react-native';
const TimeAgo = require('react-native-timeago');

import styles from '../../styles';

import row from './Row';
import { actions, selectors } from './state';

interface AbsencesProps {
    absences: string[];
    loading: boolean;
    lastUpdate: number;
    load: () => void;
    bustCache: () => void;
}

export class Absences extends React.Component<AbsencesProps, {}> {
    componentDidMount() {
        if (!this.props.absences) {
            this.props.load();
        }
    }

    render() {
        const { absences, load, bustCache, loading, lastUpdate } = this.props;

        if (loading) {
            return (
                <View style={styles.core.screenContainer}>
                    <Text>loading</Text>
                </View>
            );
        }

        return (
            <View style={styles.core.screenContainer}>
                <Text>Last updated <TimeAgo time={lastUpdate} /></Text>
                <FlatList
                    data={absences}
                    renderItem={row}
                    onRefresh={bustCache}
                    refreshing={loading}
                />
            </View>
        );
        
    }
}

const mapStateToProps = (state: any) => ({
    absences: selectors.absences,
    loading: selectors.loading,
    lastUpdate: selectors.lastUpdate,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    load: () => dispatch(actions.loadAbsences()),
    bustCache: () => dispatch(actions.loadAbsences(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Absences as any);
