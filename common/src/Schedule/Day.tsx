import React from 'react';
import { Text, View } from 'react-native';
const moment = require('moment');
import { capitalize } from 'lodash';

import { PortraitCourse, LandscapeCourse } from './Course';
import ScreenService from '../../lib/utils/screenService';
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
            const oneHourHeight = (ScreenService.getScreenSize().height - 64 - 8) / 10;
            const top = 64 + (oneHourHeight * (index));
            const style = {
                top,
            };
            return <Text key={hour} style={[GlobalStyles.schedule.hour, style]}>{hour}</Text>;
        });
}

function getCourse(course: ScheduleEntry, day: number, landscape?: boolean) {
    if (landscape) {
        return <LandscapeCourse key={`${course.start}-lanscape`} course={course} day={day} />;
    }

    return <PortraitCourse key={`${course.start}-portrait`} course={course} day={day} />;
}

type DayProps = { schedule: ScheduleEntry[], day: number, landscape?: boolean };

export default function Day({ schedule, day, landscape }: DayProps) {
    const courses = schedule.filter(
        thing => thing.entry_type === 'Course' && moment(thing.start).isoWeekday() === day
    );
    const dayName = days[day];
    // const landscapeLeft = ((ScreenService.getScreenSize().width / 5) * (day - 1));
    const styles = {
        day: {
            width: ScreenService.getScreenSize().width,
        },
        landscapeDay: {
            width: ((ScreenService.getScreenSize().width) / 5),
        },
    };

    const headingStyle = [
        GlobalStyles.schedule.day,
        (GlobalStyles.schedule as any)[dayName],
        styles.day,
        landscape ? styles.landscapeDay : {},
        // landscape ? { left: landscapeLeft } : {},
    ];

    return (
        <View style={landscape ? GlobalStyles.schedule.dayRow : {}}>
            <View style={headingStyle}>
                <Text>{capitalize(dayName)}</Text>
            </View>
            <View style={landscape ? GlobalStyles.schedule.coursesStyle : {}}>
                {courses.map(course => getCourse(course, day, landscape))}
                {landscape ? null : getHours()}
            </View>
        </View>
    );
}
