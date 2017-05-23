import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from "react-native-orientation";

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
        <View style={GlobalStyles.schedule.landscapeScheduleContainer}>
            {/* tslint:disable-next-line jsx-no-multiline-js */}
            {[1, 2, 3, 4, 5].map(num =>
                <Day key={`${num}-landscape`} schedule={schedule} day={num} landscape/>
            )}
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
        const dimens = Dimensions.get('window');
        this.state = {
            landscape: dimens.width > dimens.height,
        };
    }

    _orientationDidChange (orientation: Orientation.orientation) {
        console.log(JSON.stringify(orientation));
        // console.warn('_orientationChange'+data.orientation);
        this.setState({ landscape: orientation === 'LANDSCAPE' });
        ScreenService.setScreenSize(orientation);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.load();
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

    onLayout = (event: any) => {
        this._orientationDidChange(
            event.nativeEvent.layout.height > event.nativeEvent.layout.width
            ? 'PORTRAIT'
            : 'LANDSCAPE'
        );
    }

    render() {
        if (this.props.loading) {
            return <Text>Loading</Text>;
        }
        // console.warn('re-render');
        const { schedule } = this.props;
        return (
            <View onLayout={this.onLayout} style={{ flex: 1 }}>
              <AdaptiveSchedule landscape={this.state.landscape} schedule={schedule} />
            </View>
            // this.getScheduleForOrientation()
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
