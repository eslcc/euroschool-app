import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import moment from 'moment';
import { truncate } from 'lodash';
import { Actions } from 'react-native-router-flux';
import styles from '../../styles';

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

const theme = getTheme(); // TODO replace theme.card{} with our own list styles

function openItem(item) {
    Actions.singleExercise({ title: truncate(item.title), item });
}

export default function Row(item) {
    if (item.NOW_MARKER) {
        return (
            <View>
                <View style={styles.exercises.nowMarker} />
                <Text style={styles.exercises.nowText}>YOU ARE HERE</Text>
            </View>
        );
    }
    if (typeof item !== 'object') { return <Text>{typeof item}</Text>; }
    const due = moment(item.start.substring(0, item.start.length - 1)).locale('en-yesterday').calendar();
    return (
        <TouchableHighlight onPress={() => openItem(item)}>
            <View style={[theme.cardStyle, styles.core.card]}>
                <Text style={theme.cardContentStyle}>{`${item.param_1}\n${item.title}\nDue ${due}`}</Text>
            </View>
        </TouchableHighlight>
    );
}

// Row.propTypes = {
//     item: PropTypes.object,
// };
