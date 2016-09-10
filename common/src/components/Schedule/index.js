import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import moment from 'moment';
import Orientation from 'react-native-orientation';
import getSchedule from '../../../lib/msm/schedule';
import ScreenService from '../../../lib/utils/screenService';

import Day from './Day';

function PortraitSchedule({ schedule }) {
    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: ScreenService.getScreenSize().height,
        width: ScreenService.getScreenSize().width,
        flex: 1,
        flexDirection: 'row',
    };
    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                style = {style}
            >
                {[1, 2, 3, 4, 5].map((num) =>
                    <Day key = {`${num}-portrait`} schedule = {schedule} day = {num} />
                )}
            </ScrollView>
        </View>
    );
}

PortraitSchedule.propTypes = {
    schedule: PropTypes.array,
};

function LandscapeSchedule({ schedule }) {
    return (
        <View>
        {[1, 2, 3, 4, 5].map((num) =>
            <Day key = {`${num}-landscape`} schedule = {schedule} day = {num} landscape />
        )}
        </View>
    );
}

LandscapeSchedule.propTypes = {
    schedule: PropTypes.array,
};

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        const initial = Orientation.getInitialOrientation();
        this.state = {
            schedule: null,
            landscape: initial === 'LANDSCAPE',
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

        Orientation.addOrientationListener((orientation) => {
            this.setState({ landscape: orientation === 'LANDSCAPE', key: Math.random() });
        });
    }

    getScheduleForOrientation() {
        const props = { schedule: this.state.schedule, landscape: this.state.landscape };
        return this.state.landscape
        ? <LandscapeSchedule {...props} />
        : <PortraitSchedule {...props} />;
    }

    render() {
        return (
            <View>
            {() => {
                if (this.state.schedule === null)
                    return (<Text>Loading</Text>);

                return this.getScheduleForOrientation();
            }}
            </View>
        );
    }
}
