import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import getSchedule from '../../lib/msm/schedule';

import Day from './Day';

const screenSize = Dimensions.get('window');

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: screenSize.height,
    width: screenSize.width,
    flex: 1,
    flexDirection: 'row',
  },
});


function PortraitSchedule({ schedule }) {
  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.topBar}>
      {[1, 2, 3, 4, 5].map((num) =>
        <Day key={num} schedule={schedule} day={num} />
      )}
      </ScrollView>
    </View>
    );
}
PortraitSchedule.propTypes = {
  schedule: PropTypes.array,
};

function LandscapeSchedule({ schedule }) { // eslint-disable-line
  return (
    <Text>TODO</Text>
  );
}
LandscapeSchedule.propTypes = {
  schedule: PropTypes.array,
};

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: null,
    };
  }

  componentDidMount() {
    // TODO get rid of this shit when school starts
    getSchedule(
      moment()
          .set({ month: 8, date: 12, hour: 0, minute: 0, second: 0 })
          .isoWeekday(1),
      moment()
          .set({ month: 8, date: 12, hour: 0, minute: 0, second: 0 })
          .isoWeekday(1)
          .add(1, 'w')
          .subtract(1, 'd')
    ).then((schedule) => {
      this.setState({ schedule });
    });
  }

  render() {
    return (
      <View>
        {(() => // eslint-disable-line
           this.state.schedule == null
              ? (<Text>Loading</Text>)
              : <PortraitSchedule schedule={this.state.schedule} />
        )()}
      </View>
    );
  }
}
