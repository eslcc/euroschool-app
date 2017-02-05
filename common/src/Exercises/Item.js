import React from 'react';
import { View } from 'react-native';
import { View as ShoutemView, TouchableOpacity, Text, Tile, Title, Caption } from '@shoutem/ui';
import moment from 'moment';
import { truncate, sample } from 'lodash';
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

function openItem(item) {
    Actions.singleExercise({ title: item.title, item });
}

export default function Item(item, style) {
    // trace: 'item', item, style;
    if (item.NOW_MARKER) {
        return (
            <Tile key="NOW_MARKER">
                <ShoutemView styleName="content">
                    <View style={styles.exercises.nowMarker} />
                    <Text>YOU ARE HERE</Text>
                </ShoutemView>
            </Tile>
        );
    }


    const due = moment(item.start.substring(0, item.start.length - 1)).locale('en-yesterday').calendar();
    switch (style) {
        case 1:
            return (
                <TouchableOpacity onPress={() => openItem(item)} key={item.id} style={{ flex: 1 }}>
                    <Tile styleName="featured" style={{ backgroundColor: sample(styles.colors.tiles), flex: 1 }}>
                        <ShoutemView styleName="content">
                            <Title styleName="md-gutter-bottom">{item.title}</Title>
                            <Caption>{item.param_1}{' '.repeat(8)}{due}</Caption>
                        </ShoutemView>
                    </Tile>
                </TouchableOpacity>
            );
        default:
            return (
                <TouchableOpacity onPress={() => openItem(item)} key={item.id} style={{ backgroundColor: sample(styles.colors.tiles), flex: 1 }}>
                    <Tile styleName="small clear">
                        <View styleName="content">
                            <Title styleName="md-gutter-bottom">{item.title}</Title>
                            <Caption>{item.param_1}</Caption>
                        </View>
                    </Tile>
                </TouchableOpacity>
            );
    }

}

// Row.propTypes = {
//     item: PropTypes.object,
// };
