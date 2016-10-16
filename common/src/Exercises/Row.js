import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import moment from 'moment';
import { truncate } from 'lodash';
import { Actions } from 'react-native-router-flux';
import ScreenService from '../../lib/utils/screenService';

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

const theme = getTheme();

const styles = StyleSheet.create({
    nowMarker: {
        backgroundColor: '#D32F2F',
        height: 1,
        flex: 1,
    },
    nowText: {
        textAlign: 'center',
        color: '#f44336',
    },
});

function openItem(item) {
    Actions.singleExercise({ title: truncate(item.title), item });
}

export default function Row(item) {
    if (item.NOW_MARKER) {
        return (
            <View>
                <View style={styles.nowMarker} />
                <Text style={styles.nowText}>YOU ARE HERE</Text>
            </View>
        );
    }
    if (typeof item !== 'object') { return <Text>{typeof item}</Text>; }
    const due = moment(item.start.substring(0, item.start.length - 1)).locale('en-yesterday').calendar();
    return (
        <TouchableHighlight onPress={() => openItem(item)}>
            <View style={[theme.cardStyle, { elevation: 1, marginVertical: 8, marginHorizontal: 16 }]}>
                <Text style={theme.cardContentStyle}>{`${item.param_1}\n${item.title}\nDue ${due}`}</Text>
            </View>
        </TouchableHighlight>
    );
}

// Row.propTypes = {
//     item: PropTypes.object,
// };
