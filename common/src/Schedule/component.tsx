import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView ,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
import ScreenService from '../../lib/utils/screenService';
import Cache from '../../lib/utils/cache';
import { ScheduleEntry } from '../../lib/msm/schedule';

import GlobalStyles from '../../styles';

import { actions, selectors } from './state';

import Day from './Day';

function PortraitSchedule({ schedule }: { schedule: ScheduleEntry[] }) {
    const style = {
        height: ScreenService.getScreenSize().height,
        width: ScreenService.getScreenSize().width ,
    };
    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                style={[GlobalStyles.schedule.portraitScheduleContainer, style]}
            >
                {/* tslint:disable-next-line jsx-no-multiline-js */}
                {[1, 2, 3, 4, 5].map(num =>
                    <Day key={`${num}-portrait`} schedule={schedule} day={num} landscape={false}/>
                )}
            </ScrollView>
        </View>
    );
}

function LandscapeSchedule({ schedule }: { schedule: ScheduleEntry[] }) {
    return (
        <View>
            {/* tslint:disable-next-line jsx-no-multiline-js */}
            {[1, 2, 3, 4, 5].map(num =>
                <Day key={`${num}-landscape`} schedule={schedule} day={num} landscape/>
            )}
        </View>
    );
}

interface ScheduleProps {
    load: () => void;
    loading: boolean;
    refresh: () => void;
    schedule: ScheduleEntry[];
}

interface ScheduleState {
    schedule: ScheduleEntry[];
    landscape: boolean;
}

class Schedule extends Component<ScheduleProps, ScheduleState> {
    static route = {
        navigationBar: {
            visible: false,
        },
    };

    constructor(props: ScheduleProps) {
        super(props);
        const initial = Orientation.getInitialOrientation();
        this.state = {
            schedule: null,
            landscape: initial === 'LANDSCAPE' ,
        };
    }

    componentDidMount() {
        this.props.load();

        Orientation.addOrientationListener(orientation => {
            this.setState({ landscape: orientation === 'LANDSCAPE' });
        });
    }

    getScheduleForOrientation() {
        const { schedule } = this.props;
        return this.state.landscape
            ? <LandscapeSchedule schedule={schedule} />
            : <PortraitSchedule  schedule={schedule} />;
    }

    componentDidUpdate() {
        if (!this.props.loading) {
            Cache.set('schedule', this.props.schedule);
        }
    }

    render() {
        if (this.props.loading) {
            return <Text>Loading</Text>;
        }

        return this.getScheduleForOrientation();
    }
}

const mapStateToProps = (state: any) => ({
    schedule: selectors.schedule(state),
    loading: selectors.loading(state) ,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    load: () => dispatch(actions.loadSchedule(null, null)),
    refresh: () => dispatch(actions.refreshScheduleIfNeeded(null, null)) ,
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
