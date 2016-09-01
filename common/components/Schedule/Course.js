import React, { PropTypes } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import moment from 'moment';

import gradientize from '../../lib/utils/gradientize';

const screenSize = Dimensions.get('window');

const colors = [
  gradientize('#ffc400', '#00bcd4', 9),
  gradientize('#FF9800', '#00bcd4', 9),
  gradientize('#4CAF50', '00bcd4', 9),
  gradientize('#00E676', '#00bcd4', 9),
  gradientize('#8BC34A', '#00bcd4', 9),
];

export default function Course({ course, day }) {
  const oneHourHeight = (screenSize.width - 64) / 5.5;
  const oneMinuteHeight = (screenSize.width - 64) / 5.5 / 60;
  // Get rid of the naughty Z at the end that messes with Moment
  const start = moment(course.start.substring(0, course.start.length - 1));
  const period = parseInt(course.param_2.replace(/Period ([1-9]) {10}-/, '$1'), 10);
  const style = {
    course: {
      position: 'absolute',
      left: 80,
      width: screenSize.width - 16 - 80 - 8,
      top: 64 + ((start.hours() - 8) * oneHourHeight) + (start.minutes() * oneMinuteHeight),
      height: 45 * oneMinuteHeight,
      backgroundColor: colors[day - 1][period - 1],
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 16,
      borderRadius: 2,
      padding: 8,
      elevation: 1,
    },
    labelLevel1: {
      fontSize: 16,
    },
    labelLevel2: {
      fontSize: 12,
    },
    innerLeft: {
      flexDirection: 'column',
    },
    innerRight: {
      flexDirection: 'column',
    },
  };
  return (
    <View style={style.course}>
      <View style={style.innerLeft}>
        <Text style={style.labelLevel1}>{course.title}</Text>
        <Text style={style.labelLevel2}>{course.teacher_name_list}</Text>
      </View>
      <View style={style.innerRight}>
        <Text style={style.labelLevel1}>{course.param_1}</Text>
        <Text style={style.labelLevel2}>{course.param_2.replace(/ {10}-/, '')}</Text>
      </View>
    </View>
  );
}
Course.propTypes = {
  course: PropTypes.object,
  day: PropTypes.number,
};
