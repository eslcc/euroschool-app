import React from 'react';
import {
    Text,
    View,
} from 'react-native';
const moment = require('moment');

import gradientize from '../../lib/utils/gradientize';
import GlobalStyles from '../../styles';
import { ScheduleEntry } from '../../lib/msm/schedule';

import {AppScreen} from "./component";

const { monday, tuesday, wednesday, thursday, friday, base } = GlobalStyles.colors.schedule;

const colors = [
    gradientize(monday, base, 9),
    gradientize(tuesday, base, 9),
    gradientize(wednesday, base, 9),
    gradientize(thursday, base, 9),
    gradientize(friday, base, 9),
];

export function PortraitCourse({ course, day, screen }: { course: ScheduleEntry, day: number, screen:AppScreen }) {
    const oneHourHeight = (screen.height - 64 - 54 - 16) / 9;
    const oneMinuteHeight = oneHourHeight / 60;
    // Get rid of the naughty Z at the end that messes with Moment
    const start = moment(course.start.substring(0, course.start.length - 1));
    const period = parseInt(course.param_2.replace(/Period ([1-9]) {10}-/, '$1'), 10);
    const style = [
        GlobalStyles.schedule.portraitCourse,
        {
            width: screen.width - 16 - 80 - 8,
            top: ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
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

export function LandscapeCourse({ course, day, screen }: { course: ScheduleEntry, day: number, screen:AppScreen }) {
    const oneHourHeight = (screen.height - 64 - 8) / 11;
    const oneMinuteHeight = oneHourHeight / 60;
    const oneDayWidth = (screen.width / 5);
    const start = moment(course.start.substring(0, course.start.length - 1));
    const period = parseInt(course.param_2.replace(/Period ([1-9]) {10}-/, '$1'), 10);
    const style = [
        GlobalStyles.schedule.landscapeCourse,
        {
            width: oneDayWidth - 4,
            top: ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
            height: (45 * oneMinuteHeight),
            backgroundColor: colors[day - 1][period - 1],
        },
    ] as any;
    return (
        <View style={style}>
            <Text>{course.title}</Text>
        </View>
    );
}
