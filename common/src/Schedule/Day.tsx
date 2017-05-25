import React from 'react';
import { Text, View } from 'react-native';
const moment = require('moment');
import { capitalize } from 'lodash';

import { PortraitCourse, LandscapeCourse } from './Course';
import store from '../Store'
// import ScreenService from '../../lib/utils/screenService';
import GlobalStyles from '../../styles';
import { ScheduleEntry } from '../../lib/msm/schedule';


const days = [
    null,
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
];


function getHours() {
    return ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
        .map((hour, index) => {
            const oneHourHeight = (store.getState().screen.height - 64 - 8) / 10;
            const top = oneHourHeight * (index) - (oneHourHeight)/4;
            const style = {
                top,
            };
            return <Text key={hour} style={[GlobalStyles.schedule.hour, style]}>{hour}</Text>;
        });
}

function getCourse(course: ScheduleEntry, day: number) {
    if (store.getState().screen.landscape) {
        return <LandscapeCourse key={`${course.start}-lanscape`} course={course} day={day} />;
    }

    return <PortraitCourse key={`${course.start}-portrait`} course={course} day={day} />;
}

type DayProps = { schedule: ScheduleEntry[], day: number };

export default function Day({ schedule, day }: DayProps) {
    const courses = schedule.filter(
        thing => thing.entry_type === 'Course' && moment(thing.start).isoWeekday() === day
    );
    const dayName = days[day];
    const styles = {
        day: {
            width: store.getState().screen.width,
        },
        landscapeDay: {
            width: ((store.getState().screen.width) / 5),
        },
    };

    const headingStyle = [
        GlobalStyles.schedule.day,
        (GlobalStyles.schedule as any)[dayName],
        styles.day,
        store.getState().screen.landscape ? styles.landscapeDay : {},
    ];
    return (
        <View style={GlobalStyles.schedule.dayColumn}>
            <View style={headingStyle}>
                <Text>{capitalize(dayName)}</Text>
            </View>
            <View style={GlobalStyles.schedule.dayTruePositioning}>
                {courses.map(course => getCourse(course, day))}
                {store.getState().screen.landscape ? null : getHours()}
            </View>
        </View>
    );
}
