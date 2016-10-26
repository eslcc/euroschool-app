import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { View, ListView, Text } from 'react-native';

import styles from '../../styles';

import row from './Row';
import * as actions from './actions';

const propTypes = {
    absences: PropTypes.array,
    load: PropTypes.func,
};


export function Absences({ absences, load }) {
    if (absences && absences.length > 0) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const data = ds.cloneWithRows(absences);
        return (
            <View style={styles.core.screenContainerNoTabs}>
                <ListView
                    dataSource={data}
                    renderRow={row}
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
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(actions.loadAbsences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Absences);
