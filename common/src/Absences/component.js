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
    bustCache: PropTypes.func,
    loading: PropTypes.bool,
    lastUpdate: PropTypes.number,
};


export class Absences {
    componentDidMount() {
        if (!this.props.absences) {
            this.props.load();
        }
    }

    render() {
        const { absences, load, bustCache, loading, lastUpdate } = this.props;
        console.log(`Absences ${JSON.stringify(absences)}`);
        if (absences) {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            const data = ds.cloneWithRows(absences);
            return (
                <View style={styles.core.screenContainer}>
                    <Text>Last updated <TimeAgo time={lastUpdate} /></Text>
                    <ListView
                        enableEmptySections
                        dataSource={data}
                        renderRow={row}
                        refreshControl={<RefreshControl
                            refreshing={loading}
                            onRefresh={bustCache}
                        />}
                    />
                </View>
            );
        }
        return (
            <View style={styles.core.screenContainer}>
                <Text>loading</Text>
            </View>
        );
    }
}

Absences.propTypes = propTypes;

const mapStateToProps = state => ({
    absences: state.absences.list,
    loading: state.absences.loading,
    lastUpdate: state.absences.lastUpdate,
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(actions.loadAbsences()),
    bustCache: () => dispatch(actions.loadAbsences(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Absences);
