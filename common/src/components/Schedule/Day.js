import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { capitalize } from 'lodash';

import { PortraitCourse, LandscapeCourse } from './Course';
import ScreenService from '../../../lib/utils/screenService';


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
            fontSize: 24,
            position: 'absolute',
            top,
            left: 0,
        };
        return <Text key = {hour} style = {style}>{hour}</Text>;
    });
}

function getCourse(course, day, landscape) {
    if (landscape)
        return <LandscapeCourse key = {`${course.start}-portrait`} course = {course} day = {day} />;

    return <PortraitCourse key = {`${course.start}-landscape`} course = {course} day = {day} />;
}

export default function Day({ schedule, day, landscape }) {
    const courses = schedule.filter(
        (thing) => thing.entry_type === 'Course' && moment(thing.start).isoWeekday() === day
    );
    const dayName = days[day];
    const landscapeLeft = 80 + (((ScreenService.getScreenSize().width - 80) / 5) * (day - 1));
    console.dir(ScreenService);
    const styles = { // DIRTY HACK: Normally I would use StyleSheet.create. However, I need the
        // layout to be recalculated whenever the orientation changes.
        // TODO: make this use flexbox and avoid this
        day: {
            width: ScreenService.getScreenSize().width,
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
        },
        landscapeDay: {
            width: ((ScreenService.getScreenSize().width - 80) / 5),
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            position: 'absolute',
        },
        monday: {
            backgroundColor: '#ffc400', // Amber
        },
        tuesday: {
            backgroundColor: '#FF9800', // orange
        },
        wednesday: {
            backgroundColor: '#4CAF50', // green
        },
        thursday: {
            backgroundColor: '#00E676', // light green
        },
        friday: {
            backgroundColor: '#8BC34A', // light green
        },
    };

    const style = [
        styles.day,
        styles[dayName],
        landscape ? styles.landscapeDay : {},
        landscape ? { left: landscapeLeft } : {},
    ];

    return (
        <View>
            <View style = {style}>
                <Text>{capitalize(dayName)}</Text>
            </View>

            {courses.map((course) => getCourse(course, day, landscape))}
            {landscape ? (day === 1 ? getHours() : null) : getHours() }
        </View>
    );
}

Day.propTypes = {
    schedule: PropTypes.array,
    day: PropTypes.number,
    landscape: PropTypes.bool,
};
