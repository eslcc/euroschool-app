import * as React from 'react';
import { Text, View } from 'react-native';
const moment = require('moment');
import { capitalize } from 'lodash';

import { PortraitCourse, LandscapeCourse } from './Course';

// import ScreenService from '../../lib/utils/screenService';
import GlobalStyles from '../../styles';
import { ScheduleEntry } from '../../lib/msm/schedule';
import { actions, selectors } from "./state";
import { Screen, selectors as LayoutSelectors, Orientation } from '../Helpers/Layout/state';
import { connect } from "react-redux";


const days = [
    null,
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
];


function getHours(screen: Screen) {
    return ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
        .map((hour, index) => {
            const oneHourHeight = (screen.height - 64 - 8) / 10;
            const top = oneHourHeight * (index) - (oneHourHeight)/4;
            const style = {
                top,
            };
            return <Text key={hour} style={[GlobalStyles.schedule.hour, style]}>{hour}</Text>;
        });
}

function getCourse(course: ScheduleEntry, day: number, screen: Screen, orientation: Orientation) {
    if (orientation === 'LANDSCAPE') {
        return <LandscapeCourse key={`${course.start}-lanscape`} course={course} day={day} screen={screen} />;
    }

    return <PortraitCourse key={`${course.start}-portrait`} course={course} day={day} screen={screen} />;
}

interface DayReduxProps {
    screen: any;
    orientation: Orientation;
    schedule: ScheduleEntry[];
}

interface DayPassedProps {
    day: number;
}

abstract class Day extends React.Component<DayPassedProps & DayReduxProps, {}> {
    courses = this.props.schedule.filter(
        thing => thing.entry_type === 'Course' && moment(thing.start).isoWeekday() === this.props.day
    );
    
    dayName = days[this.props.day];

    styles = {
        day: {
            width: this.props.screen.width,
        },
        landscapeDay: {
            width: ((this.props.screen.width) / 5),
        },
    };

    headingStyle = [
        GlobalStyles.schedule.day,
        (GlobalStyles.schedule as any)[this.dayName],
        this.styles.day,
        // this.props.screen.landscape ? this.styles.landscapeDay : {},
    ];

    abstract mainBody(): JSX.Element;

    render() {
        return (
            <View style={GlobalStyles.schedule.dayColumn}>
                <View style={this.headingStyle}>
                    <Text>{capitalize(this.dayName)}</Text>
                </View>
                {this.mainBody()}
            </View>
        );
    }
}

class DumbPortraitDay extends Day {
    mainBody() {
        return (
            <View style={GlobalStyles.schedule.dayTruePositioning}>
                {this.courses.map(course =>
                    <PortraitCourse
                        key={`${course.start}-portrait`}
                        course={course}
                        day={this.props.day}
                        screen={this.props.screen}
                    />
                )}
            </View>
        );
    }
}

class DumbLandscapeDay extends Day {

    headingStyle:Object[] = [
        ...this.headingStyle,
        this.styles.landscapeDay,
    ];

    mainBody() {
        return (
            <View style={GlobalStyles.schedule.dayTruePositioning}>
                {this.courses.map(course =>
                    <LandscapeCourse
                        key={`${course.start}-portrait`}
                        course={course}
                        day={this.props.day}
                        screen={this.props.screen}
                    />
                )}
                {getHours(this.props.screen)}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    schedule: selectors.schedule(state),
    screen: LayoutSelectors.screen(state),
    orientation: LayoutSelectors.orientation(state),
});

export const PortraitDay = connect<DayReduxProps, {}, DayPassedProps>(mapStateToProps)(DumbPortraitDay);
export const LandscapeDay = connect<DayReduxProps, {}, DayPassedProps>(mapStateToProps)(DumbLandscapeDay);

