import React from 'react';
import { View } from 'react-native';
const { View: ShoutemView, TouchableOpacity, Text, Tile, Title, Caption } = require('@shoutem/ui');
const moment = require('moment');
import { sample } from 'lodash';
const { withNavigation } = require('@expo/ex-navigation');

import { ScheduleEntry } from '../../lib/msm/schedule';
import { NowMarker, isNowMarker } from './helpers';
import Router from '../router';
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

function openItem(navigator: any, item: ScheduleEntry) {
    navigator.push(Router.getRoute('singleExercise', { title: item.title, item }));
}

function hashCourse(course: string, modulus = 16): number {
    let result = 0;
    for (let i = 0, len = course.length; i < len; i++) {
        result += course.charCodeAt(i);
    }
    return result % modulus;
}

interface ItemProps {
    item: ScheduleEntry | NowMarker;
    navigator?: any;
    style: number;
}

@withNavigation
export default class Item extends React.Component<ItemProps, void> {
    render() {
        const { navigator, item, style } = this.props;
        if (isNowMarker(item)) {
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

        const background = styles.colors.tiles[hashCourse(item.param_1.replace(/.+\/ /, ''))];

        switch (style) {
            case 1:
                return (
                    <TouchableOpacity
                        onPress={/* tslint:disable-line jsx-no-lambda */() => openItem(navigator, item)}
                        key={item.id}
                        style={{ flex: 1 }}
                    >
                        <Tile styleName="featured" style={{ backgroundColor: background, flex: 1 }}>
                            <ShoutemView styleName="content">
                                <Title styleName="md-gutter-bottom">{item.title}</Title>
                                <Caption>{item.param_1}{' '.repeat(8)}{due}</Caption>
                            </ShoutemView>
                        </Tile>
                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity
                        onPress={/* tslint:disable-line jsx-no-lambda */() => openItem(navigator, item)}
                        key={item.id}
                        style={{ backgroundColor: background, flex: 1, padding: 8 }}
                    >
                        <Tile styleName="small clear">
                            <ShoutemView styleName="content">
                                <Title styleName="md-gutter-bottom">{item.title}</Title>
                                <Caption>{item.param_1}</Caption>
                            </ShoutemView>
                        </Tile>
                    </TouchableOpacity>
                );
        }
    }
}