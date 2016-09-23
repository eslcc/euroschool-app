import React, { PropTypes } from 'react';
import {
    Text,
    View,
} from 'react-native';
import moment from 'moment';

import gradientize from '../../../lib/utils/gradientize';

import ScreenService from '../../../lib/utils/screenService';

const colors = [
    gradientize('#ffc400', '#00bcd4', 9),
    gradientize('#FF9800', '#00bcd4', 9),
    gradientize('#4CAF50', '00bcd4', 9),
    gradientize('#00E676', '#00bcd4', 9),
    gradientize('#8BC34A', '#00bcd4', 9),
];

export function PortraitCourse({ course, day }) {
    const oneHourHeight = (ScreenService.getScreenSize().height - 64 - 54 - 16) / 9;
    const oneMinuteHeight = oneHourHeight / 60;
    // Get rid of the naughty Z at the end that messes with Moment
    const start = moment(course.start.substring(0, course.start.length - 1));
    const period = parseInt(course.param_2.replace(/Period ([1-9]) {10}-/, '$1'), 10);
    const style = {
        course: {
            position: 'absolute',
            left: 80,
            width: ScreenService.getScreenSize().width - 16 - 80 - 8,
            top: 64 + ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
            height: 45 * oneMinuteHeight,
            backgroundColor: colors[day - 1][period - 1],
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 16,
            borderRadius: 2,
            padding: 8,
            elevation: 1,
        },
        labelLevel1: {
            fontSize: 16,
        },
        labelLevel2: {
            fontSize: 12,
        },
        innerLeft: {
            flexDirection: 'column',
        },
        innerRight: {
            flexDirection: 'column',
        },
    };
    return (
        <View style={style.course}>
            <View style={style.innerLeft}>
                <Text style={style.labelLevel1}>{course.title}</Text>
                <Text style={style.labelLevel2}>{course.teacher_name_list}</Text>
            </View>
            <View style={style.innerRight}>
                <Text style={style.labelLevel1}>{course.param_1}</Text>
                <Text style={style.labelLevel2}>{`Period ${period}`}</Text>
            </View>
        </View>
    );
}

PortraitCourse.propTypes = {
    course: PropTypes.object,
    day: PropTypes.number,
};

export function LandscapeCourse({ course, day }) {
    const oneHourHeight = (ScreenService.getScreenSize().height - 64 - 8) / 10;
    const oneMinuteHeight = oneHourHeight / 60;
    const oneDayWidth = (ScreenService.getScreenSize().width / 5);
    const start = moment(course.start.substring(0, course.start.length - 1));
    const period = parseInt(course.param_2.replace(/Period ([1-9]) {10}-/, '$1'), 10);
    const style = {
        course: {
            position: 'absolute',
            left: ((day - 1) * oneDayWidth) + 2,
            width: oneDayWidth - 4,
            top: 44 + ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
            height: (45 * oneMinuteHeight),
            backgroundColor: colors[day - 1][period - 1],
            marginRight: 16,
            borderRadius: 2,
            paddingLeft: 8,
            paddingTop: 0,
            elevation: 1,
            marginBottom: 16,
        },
    };
    return (
        <View style={style.course}>
            <Text>{ course.title }</Text>
        </View>
    );
}

LandscapeCourse.propTypes = {
    course: PropTypes.object,
    day: PropTypes.number,
};
