import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { GridRow, Tile, Title, Caption } from '@shoutem/ui';
import moment from 'moment';
import { truncate } from 'lodash';

import styles from '../../styles';
import renderItem from './Item';

moment.defineLocale('en-yesterday', {
    parent: 'en',
    calendar: {
        lastDay: '[yesterday]',
        sameDay: '[today]',
        nextDay: '[tomorrow]',
        lastWeek: '[last] dddd',
        nextWeek: 'dddd',
        sameElse: 'L',
    },
});


export default function Row(row) {
    trace: 'row', row;
    const key = '__' + row.map(item => item.id).join(';');
    return (
        <TouchableHighlight key={key} style={styles.fill}>
            <GridRow columns={row.length} style={styles.fill}>
                {row.map(item => renderItem(item, row.length))}
            </GridRow>
        </TouchableHighlight>
    );
}

// Row.propTypes = {
//     row: PropTypes.object,
// };
