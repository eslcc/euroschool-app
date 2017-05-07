import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
const { GridRow, Tile, Title, Caption } = require('@shoutem/ui');
import * as moment from 'moment';
import { truncate } from 'lodash';

import { ScheduleEntry } from '../../lib/msm/schedule';
import styles from '../../styles';
import Item from './Item';

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


export default function Row(row: ScheduleEntry[]) {
    const key = '__' + row.map(item => item.id).join(';');
    return (
        <TouchableHighlight key={key} style={styles.fill}>
            <GridRow columns={row.length} style={styles.fill}>
                {row.map(item => <Item key={key + item.id} item={item} style={row.length} />)}
            </GridRow>
        </TouchableHighlight>
    );
}
