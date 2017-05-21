import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView ,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation, { getOrientation, orientation } from 'react-native-orientation';
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
    const style = {
        height: ScreenService.getScreenSize().height,
        width: ScreenService.getScreenSize().width,
    };
    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                style={[GlobalStyles.schedule.landscapeScheduleContainer, style]}
            >
                {/* tslint:disable-next-line jsx-no-multiline-js */}
                {[1, 2, 3, 4, 5].map(num =>
                    <Day key={`${num}-portrait`} schedule={schedule} day={num} landscape={false}/>
                )}
            </ScrollView>
        </View>
    );
}



interface AdaptiveScheduleProps {
    landscape: boolean;
    schedule: ScheduleEntry[];
}

interface AdaptiveScheduleState {

}

class AdaptiveSchedule extends  Component<AdaptiveScheduleProps, AdaptiveScheduleState> {
    constructor(props: AdaptiveScheduleProps) {
        super(props);
    }

    getScheduleForOrientation() {
        const { schedule } = this.props;
        return this.props.landscape
            ? <LandscapeSchedule schedule={schedule} />
            : <PortraitSchedule  schedule={schedule} />;
    }

    render() {
        return this.getScheduleForOrientation();
    }
}

interface ScheduleProps {
    load: () => void;
    loading: boolean;
    refresh: () => void;
    schedule: ScheduleEntry[];
    event : any;
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

    _orientationDidChange (orientation:any) {
        console.warn('_orientationChange');
        this.setState({ landscape: orientation === 'LANDSCAPE' });
    }

    componentWillMount() {
        //The getOrientation method is async. It happens sometimes that
        //you need the orientation at the moment the js starts running on device.
        //getInitialOrientation returns directly because its a constant set at the
        //beginning of the js code.
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.setState({ landscape: false });
        }
    }

    componentDidMount() {
        this.props.load();

        // Orientation.lockToPortrait(); //this will lock the view to Portrait
        // Orientation.lockToLandscape(); //this will lock the view to Landscape
        Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

        Orientation.addOrientationListener(this._orientationDidChange);
    }

    componentWillUnmount () {
        Orientation.getOrientation((err,orientation)=> {
            console.log("Current Device Orientation: ", orientation);
        });
        Orientation.removeOrientationListener(this._orientationDidChange);
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
        console.warn('re-render');
        const { schedule } = this.props;
        return (
            <AdaptiveSchedule landscape={this.state.landscape} schedule={schedule} />
        );
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
