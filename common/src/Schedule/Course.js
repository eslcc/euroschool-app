import React, { PropTypes } from 'react';
import {
    Text,
    View,
} from 'react-native';
import * as moment from 'moment';

import gradientize from '../../lib/utils/gradientize';
import GlobalStyles, { colors as styleColors } from '../../styles';

import ScreenService from '../../lib/utils/screenService';

const { monday, tuesday, wednesday, thursday, friday, base } = styleColors.schedule;

const colors = [
    gradientize(monday, base, 9),
    gradientize(tuesday, base, 9),
    gradientize(wednesday, base, 9),
    gradientize(thursday, base, 9),
    gradientize(friday, base, 9),
];

export function PortraitCourse({ course, day }) {
    const oneHourHeight = (ScreenService.getScreenSize().height - 64 - 54 - 16) / 9;
    const oneMinuteHeight = oneHourHeight / 60;
    // Get rid of the naughty Z at the end that messes with Moment
    const start = moment(course.start.substring(0, course.start.length - 1));
    const period = parseInt(course.param_2.replace(/Period ([1-9]) {10}-/, '$1'), 10);
    const style = [
        GlobalStyles.schedule.portraitCourse,
        {
            width: ScreenService.getScreenSize().width - 16 - 80 - 8,
            top: 64 + ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
            height: 45 * oneMinuteHeight,
            backgroundColor: colors[day - 1][period - 1],
        },
    ];
    return (
        <View style={style}>
            <View style={GlobalStyles.schedule.portraitCourseInnerContainer}>
                <Text style={GlobalStyles.schedule.portraitCourseLabelLevel1}>{course.title}</Text>
                <Text style={GlobalStyles.schedule.portraitCourseLabelLevel2}>{course.teacher_name_list}</Text>
            </View>
            <View style={GlobalStyles.schedule.portraitCourseInnerContainer}>
                <Text style={GlobalStyles.schedule.portraitCourseLabelLevel1}>{course.param_1}</Text>
                <Text style={GlobalStyles.schedule.portraitCourseLabelLevel2}>{`Period ${period}`}</Text>
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
    const style = [
        GlobalStyles.schedule.landscapeCourse,
        {
            left: ((day - 1) * oneDayWidth) + 2,
            width: oneDayWidth - 4,
            top: 44 + ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
            height: (45 * oneMinuteHeight),
            backgroundColor: colors[day - 1][period - 1],
        },
    ];
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
