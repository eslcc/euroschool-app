import React, {Component} from 'react';
import { Text, View } from 'react-native';
const moment = require('moment');
import { capitalize } from 'lodash';

import { PortraitCourse, LandscapeCourse } from './Course';

// import ScreenService from '../../lib/utils/screenService';
import GlobalStyles from '../../styles';
import { ScheduleEntry } from '../../lib/msm/schedule';
import {actions, AppScreen, selectors} from "./state";
import {connect} from "react-redux";


const days = [
    null,
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
];


function getHours(screen: AppScreen) {
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

function getCourse(course: ScheduleEntry, day: number, screen:AppScreen) {
    const { store } = this.context;
    if (store.getState().screen.landscape) {
        return <LandscapeCourse key={`${course.start}-lanscape`} course={course} day={day} screen={screen} />;
    }

    return <PortraitCourse key={`${course.start}-portrait`} course={course} day={day} screen={screen} />;
}

interface DayProps {
    day: number, schedule: ScheduleEntry[], screen: any
};

class Day extends Component<DayProps, {}> {
    // const { store } = this.context;
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

    mainBody() {
        return;
    };

    render() {
        return (
            <View style={GlobalStyles.schedule.dayColumn}>
                <View style={this.headingStyle}>
                    <Text>{capitalize(this.dayName)}</Text>
                </View>
                {/*<View style={GlobalStyles.schedule.dayTruePositioning}>
                    {this.courses.map(course => getCourse(course, this.props.day))}
                    {this.props.screen.landscape ? null : getHours()}
                </View>*/}
                { this.mainBody() }
            </View>
        )
    };
}

/*const mapStateToProps = (state: any) => ({
    schedule: selectors.schedule(state),
    screen: selectors.screen(state),
});
const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    // orient: (event: any) => dispatch(actions.orientSchedule(event)),
});

const mergeProps = (stateProps:Object, dispatchProps:Object, ownProps:Object) => {
    return {
        ...ownProps,
        stateProps,
        dispatchProps
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Day as any);*/

export class PortraitDay extends Day {
    mainBody() {
        return (
            <View style={GlobalStyles.schedule.dayTruePositioning}>
                {this.courses.map(course =>
                    <PortraitCourse key={`${course.start}-portrait`} course={course} day={this.props.day} screen={this.props.screen} />
                )}
            </View>
        )
    }
}

export class LandscapeDay extends Day {

    headingStyle:Object[] = [
        ...this.headingStyle,
        this.styles.landscapeDay
    ];

    mainBody() {
        return (
            <View style={GlobalStyles.schedule.dayTruePositioning}>
                {this.courses.map(course =>
                    <LandscapeCourse key={`${course.start}-portrait`} course={course} day={this.props.day} screen={this.props.screen}/>
                )}
                { getHours(this.props.screen) }
            </View>
        )
    }
}
