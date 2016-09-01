import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { capitalize } from 'lodash';

import Course from './Course';

const screenSize = Dimensions.get('window');

const days = [
  null,
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

const styles = StyleSheet.create({
  day: {
    width: screenSize.width,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#8BC34A', // cyan
  },
});


export default function Day({ schedule, day }) {
  const courses = schedule.filter(
      (thing) => thing.entry_type === 'Course' && moment(thing.start).isoWeekday() === day
  );
  const dayName = days[day];

  return (
    <View>
      <View style={[styles.day, styles[dayName]]}>
        <Text>{capitalize(dayName)}</Text>
      </View>

      {courses.map((course) =>
        <Course key={course.start} course={course} day={day} />
      )}

      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
        .map((hour, index) => {
          const oneHourHeight = (screenSize.width - 64) / 5.5;
          const top = 64 + (oneHourHeight * (index));
          const style = {
            fontSize: 24,
            position: 'absolute',
            top: top,
            left: 0
          };
          return <Text key={hour} style={style}>{hour}</Text>;
        })}

    </View>
  );
}
Day.propTypes = {
  schedule: PropTypes.array,
  day: PropTypes.number,
};

