import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import moment from 'moment';
import { capitalize } from 'lodash';

const screenSize = Dimensions.get('window');

const days = [
  null,
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
];

const styles = StyleSheet.create({
  day: {
    width: screenSize.width,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  monday: {
    backgroundColor: '#00BCD4'
  },
  tuesday: {
    backgroundColor: '#009688'
  },
  wednesday: {
    backgroundColor: '#3F51B5'
  },
  thursday: {
    backgroundColor: '#673AB7'
  },
  friday: {
    backgroundColor: '#E91E61'
  }
});

function Course({ course }) {
  const oneHourHeight = (screenSize.width - 64) / 5;
  const oneMinuteHeight = (screenSize.width - 64) / 5 / 60;
  // Get rid of the naughty Z at the end that messes with Moment
  const start = moment(course.start.substring(0, course.start.length - 1));
  const end = moment(course.end.substring(0, course.end.length - 1));
  const duration = moment(end.diff(start));
  const style = {
    course: {
      position: 'absolute',
       left: 0,
       width: screenSize.width,
      top: 64 + ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
      height: 45 * oneMinuteHeight,
       backgroundColor: course.color,
       flexDirection: 'row',
       justifyContent: 'space-between'
    },
    label: {
      fontSize: 19
    }
  };
  return (
    <View style={style.course}>
      <View style={{flexDirection: 'column'}}>
        <Text style={style.label}>{course.title}</Text>
        <Text style={style.label}>{course.teacher_name_list}</Text>
      </View>
      <View style={{flexDirection: 'column', marginRight: 32}}>
        <Text style={style.label}>{course.param_1}</Text>
        <Text style={style.label}>{course.param_2.replace(/          -/, '')}</Text>
      </View>
    </View>
  );
}

export default function Day({ schedule, day }) {
  const courses = schedule
                  .filter((thing) => thing.entry_type == 'Course' && moment(thing.start).isoWeekday() == day)
  const dayName = days[day];

  return (
    <View>
      <View style={[styles.day, styles[dayName]]}>
        <Text>{capitalize(dayName)}</Text>
      </View>

      {courses.map((course) =>
        <Course key={course.start} course={course} />
      )}
    </View>
  );
}
