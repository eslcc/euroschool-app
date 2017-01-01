import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { View, ListView, Text, RefreshControl } from 'react-native';
import TimeAgo from 'react-native-timeago';

import styles from '../../styles';

import row from './Row';
import * as actions from './actions';

const propTypes = {
    absences: PropTypes.arrayOf(PropTypes.string),
    load: PropTypes.func,
    loading: PropTypes.bool,
    lastUpdate: PropTypes.number,
};


export function Absences({ absences, load, loading, lastUpdate }) {
    if (absences) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const data = ds.cloneWithRows(absences);
        return (
            <View style={styles.core.screenContainerNoTabs}>
                <Text>Last updated <TimeAgo time={lastUpdate} /></Text>
                <ListView
                    dataSource={data}
                    renderRow={row}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        onRefresh={load}
                    />}
                />
            </View>
        );
    }
    load();
    return (
        <View style={styles.core.screenContainer}>
            <Text>loading</Text>
        </View>
    );
}

Absences.propTypes = propTypes;

const mapStateToProps = state => ({
    absences: state.absences.list,
    loading: state.absences.loading,
    lastUpdate: state.absences.lastUpdate,
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(actions.loadAbsences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Absences);
