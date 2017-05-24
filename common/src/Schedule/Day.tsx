import React from 'react';
import { Text, View } from 'react-native';
const moment = require('moment');
import { capitalize } from 'lodash';

import { AppScreen } from  './component';
import { PortraitCourse, LandscapeCourse } from './Course';
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


function getHours(screen:AppScreen) {
    return ['', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'] //No 08:00, it doesn't fit
        .map((hour, index) => {
            const oneHourHeight = (screen.height - 64 - 8) / 10;
            const top = oneHourHeight * (index) - (oneHourHeight)/4;
            const style = {
                top,
            };
            return <Text key={hour} style={[GlobalStyles.schedule.hour, style]}>{hour}</Text>;
        });
}

function getCourse(course: ScheduleEntry, day: number, screen: AppScreen) {
    if (screen.landscape) {
        return <LandscapeCourse key={`${course.start}-lanscape`} course={course} day={day} screen={screen} />;
    }

    return <PortraitCourse key={`${course.start}-portrait`} course={course} day={day} screen={screen} />;
}

type DayProps = { schedule: ScheduleEntry[], day: number, screen: AppScreen };

export default function Day({ schedule, day, screen }: DayProps) {
    const courses = schedule.filter(
        thing => thing.entry_type === 'Course' && moment(thing.start).isoWeekday() === day
    );
    const dayName = days[day];
    const styles = {
        day: {
            width: screen.width,
        },
        landscapeDay: {
            width: (screen.width) / 5,
        },
    };

    const headingStyle = [
        GlobalStyles.schedule.day,
        (GlobalStyles.schedule as any)[dayName],
        styles.day,
        screen.landscape ? styles.landscapeDay : {},
    ];
    return (
        <View style={GlobalStyles.schedule.dayColumn}>
            <View style={headingStyle}>
                <Text>{capitalize(dayName)}</Text>
            </View>
            <View style={GlobalStyles.schedule.dayTruePositioning}>
                {courses.map(course => getCourse(course, day, screen))}
                {screen.landscape ? null : getHours(screen)}
            </View>
        </View>
    );
}
