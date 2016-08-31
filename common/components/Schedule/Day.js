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
    backgroundColor: '#ffc400' //Cyan and amber
  },
  tuesday: {
    backgroundColor: '#00E676'
  },
  wednesday: {
    backgroundColor: '#F50057'
  },
  thursday: {
    backgroundColor: '#3F51B5'
  },
  friday: {
    backgroundColor: '#673AB7'
  }
});

const colors = [
  "#006064",
  "#00838F",
  "#0097A7",
  "#00ACC1",
  "#00BCD4",
  "#26C6DA",
  "#4DD0E1",
  "#80DEEA",
  ""
]

function Course({ course }) {
  const oneHourHeight = (screenSize.width - 64) / 5.5;
  const oneMinuteHeight = (screenSize.width - 64) / 5.5 / 60;
  // Get rid of the naughty Z at the end that messes with Moment
  const start = moment(course.start.substring(0, course.start.length - 1));
  const end = moment(course.end.substring(0, course.end.length - 1));
  const duration = moment(end.diff(start));
  const style = {
    course: {
      position: 'absolute',
      left: 16,
      width: screenSize.width - 32,
      top: 64 + ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
      height: 45 * oneMinuteHeight,
      backgroundColor: '#00BCD4',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 16,
      borderRadius: 2,
      padding: 8,
      elevation: 1
    },
    labelLevel1: {
      fontSize: 16
    },
    labelLevel2: {
      fontSize: 12
    },
    innerLeft: {
      flexDirection: 'column'
    },
    innerRight: {
      flexDirection: 'column'
    }
  };
  return (
    <View style={style.course}>
      <View style={style.innerLeft}>
        <Text style={style.labelLevel1}>{course.title}</Text>
        <Text style={style.labelLevel2}>{course.teacher_name_list}</Text>
      </View>
      <View style={style.innerRight}>
        <Text style={style.labelLevel1}>{course.param_1}</Text>
        <Text style={style.labelLevel2}>{course.param_2.replace(/          -/, '')}</Text>
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
