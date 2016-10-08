import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import moment from 'moment';
import { truncate } from 'lodash';
import { Actions } from 'react-native-router-flux';

moment.defineLocale('en-yesterday', {
    parent: 'en',
    calendar: {
        lastDay: '[yesterday]',
        sameDay: '[today]',
        nextDay: '[tomorrow]',
        lastWeek: 'dddd',
        nextWeek: 'dddd',
        sameElse: 'L',
    },
});

const theme = getTheme();

function openItem(item) {
    Actions.singleExercise({ title: truncate(item.title), item });
}

export default function Row(item) {
    if (!(item)) { return <Text>{typeof item}</Text>; }
    const due = moment(item.start.substring(0, item.start.length - 1)).locale('en-yesterday').calendar();
    return (
        <TouchableHighlight onPress={() => openItem(item)}>
            <View style={[theme.cardStyle, { elevation: 1, marginVertical: 8, marginHorizontal: 16 }]}>
                <Text style={theme.cardContentStyle}>{`${item.param_1}\n${item.title}\nDue ${due}`}</Text>
            </View>
        </TouchableHighlight>
    );
}

Row.propTypes = {
    item: PropTypes.object,
};
