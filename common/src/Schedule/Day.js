import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { capitalize } from 'lodash';

import { PortraitCourse, LandscapeCourse } from './Course';
import ScreenService from '../../lib/utils/screenService';
import GlobalStyles from '../../styles';


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

function getCourse(course, day, landscape) {
    if (landscape) {
        return <LandscapeCourse key={`${course.start}-portrait`} course={course} day={day} />;
    }

    return <PortraitCourse key={`${course.start}-landscape`} course={course} day={day} />;
}

export default function Day({ schedule, day, landscape }) {
    const courses = schedule.filter(
        thing => thing.entry_type === 'Course' && moment(thing.start).isoWeekday() === day
    );
    const dayName = days[day];
    const landscapeLeft = ((ScreenService.getScreenSize().width / 5) * (day - 1));
    const styles = {
        day: {
            width: ScreenService.getScreenSize().width,
        },
        landscapeDay: {
            width: ((ScreenService.getScreenSize().width) / 5),
        },
    };

    const style = [
        GlobalStyles.schedule.day,
        GlobalStyles.schedule[dayName],
        styles.day,
        landscape ? styles.landscapeDay : {},
        landscape ? { left: landscapeLeft } : {},
    ];

    return (
        <View>
            <View style={style}>
                <Text>{capitalize(dayName)}</Text>
            </View>

            {courses.map(course => getCourse(course, day, landscape))}
            {landscape ? null : getHours() }
        </View>
    );
}

Day.propTypes = {
    schedule: PropTypes.array,
    day: PropTypes.number,
    landscape: PropTypes.bool,
};
